const PLAN_FEATURES: Record<
  string,
  string[]
> = {
  FREE: [
    "Up to 3 Projects",
    "Basic Kanban",
    "1GB Storage",
  ],

  PRO: [
    "Unlimited Projects",
    "Advanced Analytics",
    "10GB Storage",
    "Priority Support",
  ],

  ENTERPRISE: [
    "SSO & SAML",
    "Custom Security",
    "Unlimited Storage",
  ],
};

const formatInvoice = (
  invoice: any
) => {
  return {
    id: invoice.id,

    date: invoice.invoiceDate,

    plan: invoice.billing?.plan ?? "UNKNOWN",

    amount: invoice.amount,

    status:
      invoice.status === "PENDING"
        ? "Pending"
        : "Paid",

    downloadUrl:
      invoice.downloadUrl ?? "",
  };
};

export const formatBilling = (
  billing: any
) => {
  return {
    plan: billing.plan,

    price: billing.monthlyPrice,

    billingCycle:
      billing.billingCycle,

    renewDate:
      billing.renewalDate
        ? billing.renewalDate.toISOString()
        : "",

    paymentMethod: {
      brand:
        billing.cardBrand ?? "",

      last4:
        billing.cardLast4 ?? "",

      expiry:
        billing.cardExpiry ?? "",
    },

    features:
      PLAN_FEATURES[billing.plan] ??
      [],

    invoices:
      billing.invoices.map(
        (invoice: any) => ({
          id: invoice.id,

          date:
            invoice.invoiceDate,

          plan:
            billing.plan,

          amount:
            invoice.amount,

          status:
            invoice.status === "PENDING"
              ? "Pending"
              : "Paid",

          downloadUrl:
            invoice.downloadUrl ??
            "",
        })
      ),
  };
};