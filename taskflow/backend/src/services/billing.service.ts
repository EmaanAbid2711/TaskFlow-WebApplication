import prisma from "../config/prisma";

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

  if (!billing) {
    billing =
      await prisma.billing.create({
        data: {
          userId,
        },
        include: {
          invoices: true,
        },
      });
  }

  return billing;
};

export const updatePlan =
  async (
    userId: string,
    plan: "FREE" | "PRO"
  ) => {
    const monthlyPrice =
      plan === "PRO"
        ? 12
        : 0;

    const renewalDate =
      plan === "PRO"
        ? new Date(
            Date.now() +
              30 *
                24 *
                60 *
                60 *
                1000
          )
        : null;

    return prisma.billing.update({
      where: {
        userId,
      },
      data: {
        plan,
        monthlyPrice,
        renewalDate,
      },
    });
  };

export const updatePaymentMethod =
  async (
    userId: string,
    cardBrand: string,
    cardLast4: string,
    cardExpiry: string
  ) => {
    return prisma.billing.update({
      where: {
        userId,
      },
      data: {
        cardBrand,
        cardLast4,
        cardExpiry,
      },
    });
  };
  