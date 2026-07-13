import { Billing, InvoiceStatus, PlanType, Invoice } from "@prisma/client";

type BillingWithInvoices = Billing & {
  invoices: Invoice[];
};

const formatDate = (
  date: Date | null
): string | null => {
  if (!date) return null;

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatBilling = (
  billing: BillingWithInvoices
) => {
  return {
    plan:
      billing.plan === PlanType.PRO
        ? "TaskFlow Pro"
        : "TaskFlow Free",

    price: billing.monthlyPrice,

    billingCycle: `Billed ${billing.billingCycle.toLowerCase()}`,

    renewDate: formatDate(
      billing.renewalDate
    ),

    paymentMethod: {
      brand:
        billing.cardBrand ?? "VISA",

      last4:
        billing.cardLast4 ?? "4242",

      expiry:
        billing.cardExpiry ?? "12/2027",
    },

    invoices: billing.invoices.map(
      (invoice) => ({
        id: invoice.id,

        date: formatDate(
          invoice.invoiceDate
        ),

        plan:
          billing.plan === PlanType.PRO
            ? "TaskFlow Pro"
            : "TaskFlow Free",

        amount: invoice.amount,

        status:
          invoice.status ===
          InvoiceStatus.PAID
            ? "Paid"
            : "Pending",

        downloadUrl:
          invoice.downloadUrl ?? "#",
      })
    ),
  };
};