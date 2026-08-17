import prisma from "../config/prisma";

export type BillingPlan =
  | "FREE"
  | "PRO"
  | "ENTERPRISE";

const PLAN_PRICES: Record<
  BillingPlan,
  number
> = {
  FREE: 0,
  PRO: 12,
  ENTERPRISE: 39,
};

const getRenewalDate = (
  plan: BillingPlan
): Date | null => {
  if (plan === "FREE") {
    return null;
  }

  const renewalDate = new Date();

  renewalDate.setMonth(
    renewalDate.getMonth() + 1
  );

  return renewalDate;
};

const getPlanPrice = (
  plan: BillingPlan
): number => {
  return PLAN_PRICES[plan];
};

export const getBilling = async (
  userId: string
) => {
  let billing =
    await prisma.billing.findUnique({
      where: {
        userId,
      },
      include: {
        invoices: {
          orderBy: {
            invoiceDate: "desc",
          },
        },
      },
    });

  /*
   * Create billing information for the
   * user if it does not exist yet.
   */
  if (!billing) {
    billing =
      await prisma.billing.create({
        data: {
          userId,
          plan: "FREE",
          monthlyPrice: 0,
          billingCycle: "Monthly",
          renewalDate: null,
        },
        include: {
          invoices: {
            orderBy: {
              invoiceDate: "desc",
            },
          },
        },
      });
  }

  return billing;
};

export const updatePlan = async (
  userId: string,
  plan: BillingPlan
) => {
  const monthlyPrice =
    getPlanPrice(plan);

  const renewalDate =
    getRenewalDate(plan);

  /*
   * Make sure the billing record exists.
   *
   * Normally getBilling() creates it, but
   * upsert makes this service safer when
   * called directly.
   */
  const billing =
    await prisma.billing.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        plan,
        monthlyPrice,
        billingCycle: "Monthly",
        renewalDate,
      },
      update: {},
    });

  /*
   * FREE does not represent a paid
   * subscription, so no paid invoice
   * is created.
   */
  if (plan === "FREE") {
    return prisma.billing.update({
      where: {
        id: billing.id,
      },
      data: {
        plan,
        monthlyPrice,
        billingCycle: "Monthly",
        renewalDate,
      },
      include: {
        invoices: {
          orderBy: {
            invoiceDate: "desc",
          },
        },
      },
    });
  }

  /*
   * Paid plan:
   *
   * 1. Update billing
   * 2. Create invoice
   *
   * Both operations happen inside the
   * same transaction.
   */
  return prisma.$transaction(
    async (transaction) => {
      const updatedBilling =
        await transaction.billing.update({
          where: {
            id: billing.id,
          },
          data: {
            plan,
            monthlyPrice,
            billingCycle: "Monthly",
            renewalDate,
          },
        });

      await transaction.invoice.create({
        data: {
          billingId:
            updatedBilling.id,
          plan,
          amount: monthlyPrice,
          status: "PAID",
          invoiceDate: new Date(),
          downloadUrl: null,
        },
      });

      return transaction.billing.findUnique({
        where: {
          id: updatedBilling.id,
        },
        include: {
          invoices: {
            orderBy: {
              invoiceDate: "desc",
            },
          },
        },
      });
    }
  );
};

export const updatePaymentMethod =
  async (
    userId: string,
    cardBrand: string,
    cardLast4: string,
    cardExpiry: string
  ) => {
    /*
     * Only payment metadata is stored.
     *
     * Full card number and CVV must NEVER
     * be stored in the database.
     */
    return prisma.billing.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        plan: "FREE",
        monthlyPrice: 0,
        billingCycle: "Monthly",
        renewalDate: null,
        cardBrand,
        cardLast4,
        cardExpiry,
      },
      update: {
        cardBrand,
        cardLast4,
        cardExpiry,
      },
      include: {
        invoices: {
          orderBy: {
            invoiceDate: "desc",
          },
        },
      },
    });
  };