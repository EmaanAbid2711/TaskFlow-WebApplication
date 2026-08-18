import prisma from "../config/prisma";

export type BillingPlan =
  | "FREE"
  | "PRO"
  | "ENTERPRISE";

/*
 * ------------------------------------------------------------
 * Plan Pricing
 * ------------------------------------------------------------
 */

const PLAN_PRICES: Record<
  BillingPlan,
  number
> = {
  FREE: 0,
  PRO: 12,
  ENTERPRISE: 39,
};

/*
 * ------------------------------------------------------------
 * Renewal Date
 * ------------------------------------------------------------
 *
 * FREE:
 *   No renewal date.
 *
 * PRO / ENTERPRISE:
 *   One month from the current date.
 * ------------------------------------------------------------
 */

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

/*
 * ------------------------------------------------------------
 * Plan Price
 * ------------------------------------------------------------
 */

const getPlanPrice = (
  plan: BillingPlan
): number => {
  return PLAN_PRICES[plan];
};

/*
 * ------------------------------------------------------------
 * Invoice Include
 * ------------------------------------------------------------
 *
 * Keeps invoice ordering consistent across
 * all billing operations.
 * ------------------------------------------------------------
 */

const invoiceInclude = {
  invoices: {
    orderBy: {
      invoiceDate: "desc" as const,
    },
  },
};

/*
 * ------------------------------------------------------------
 * Get Billing
 * ------------------------------------------------------------
 *
 * Retrieves the billing record for the authenticated user.
 *
 * If the user does not have a billing record yet,
 * a FREE billing record is created automatically.
 * ------------------------------------------------------------
 */

export const getBilling = async (
  userId: string
) => {
  let billing =
    await prisma.billing.findUnique({
      where: {
        userId,
      },
      include: invoiceInclude,
    });

  /*
   * Create default FREE billing record
   * when one does not exist.
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
        include: invoiceInclude,
      });
  }

  return billing;
};

/*
 * ------------------------------------------------------------
 * Update Billing Plan
 * ------------------------------------------------------------
 *
 * FREE:
 *   Updates the billing record without creating an invoice.
 *
 * PRO / ENTERPRISE:
 *   Updates the billing record and creates a PAID invoice.
 *
 * A duplicate invoice is NOT created when the user selects
 * the same paid plan they are already subscribed to.
 * ------------------------------------------------------------
 */

export const updatePlan = async (
  userId: string,
  plan: BillingPlan
) => {
  const monthlyPrice =
    getPlanPrice(plan);

  const renewalDate =
    getRenewalDate(plan);

  /*
   * ----------------------------------------------------------
   * Make sure billing record exists.
   * ----------------------------------------------------------
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

      /*
       * Don't update anything yet.
       * The actual update happens below.
       */
      update: {},
    });

  /*
   * ----------------------------------------------------------
   * Check whether the selected plan is already active.
   * ----------------------------------------------------------
   *
   * This prevents unnecessary invoices when the user
   * selects the same paid plan again.
   * ----------------------------------------------------------
   */

  if (billing.plan === plan) {
    return prisma.billing.findUnique({
      where: {
        id: billing.id,
      },
      include: invoiceInclude,
    });
  }

  /*
   * ----------------------------------------------------------
   * FREE PLAN
   * ----------------------------------------------------------
   *
   * No paid invoice is created.
   * ----------------------------------------------------------
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

      include: invoiceInclude,
    });
  }

  /*
   * ----------------------------------------------------------
   * PAID PLAN
   * ----------------------------------------------------------
   *
   * Update billing + create invoice inside
   * one database transaction.
   * ----------------------------------------------------------
   */

  return prisma.$transaction(
    async (transaction) => {
      /*
       * Update billing record.
       */

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

      /*
       * Create invoice for the new paid plan.
       */

      await transaction.invoice.create({
        data: {
          billingId:
            updatedBilling.id,

          plan,

          amount:
            monthlyPrice,

          status: "PAID",

          invoiceDate:
            new Date(),

          downloadUrl:
            null,
        },
      });

      /*
       * Return updated billing record
       * including invoices.
       */

      return transaction.billing.findUnique({
        where: {
          id: updatedBilling.id,
        },

        include: invoiceInclude,
      });
    }
  );
};

/*
 * ------------------------------------------------------------
 * Update Payment Method
 * ------------------------------------------------------------
 *
 * Only safe payment metadata is stored:
 *
 *   cardBrand
 *   cardLast4
 *   cardExpiry
 *
 * NEVER store:
 *
 *   full card number
 *   CVV
 * ------------------------------------------------------------
 */

export const updatePaymentMethod =
  async (
    userId: string,
    cardBrand: string,
    cardLast4: string,
    cardExpiry: string
  ) => {
    return prisma.billing.upsert({
      where: {
        userId,
      },

      /*
       * If billing does not exist,
       * create a FREE billing record
       * with the payment method.
       */

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

      /*
       * If billing already exists,
       * only update payment metadata.
       */

      update: {
        cardBrand,
        cardLast4,
        cardExpiry,
      },

      include: invoiceInclude,
    });
  };