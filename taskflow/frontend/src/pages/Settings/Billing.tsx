import {CurrentPlanCard, PaymentMethodCard, InvoiceList} from "@/components";
import type {BillingInfo} from "@/interfaces/billing";

function Billing() {
  const billing: BillingInfo = {
  plan: "TaskFlow Pro",
  price: 12,
  billingCycle: "Billed monthly",
  renewDate: "Aug 9, 2026",

  paymentMethod: {
    brand: "VISA",
    last4: "4242",
    expiry: "12/2027",
  },

  invoices: [
    {
      id: "1",
      date: "Jul 9, 2026",
      plan: "TaskFlow Pro",
      amount: 12,
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: "2",
      date: "Jun 9, 2026",
      plan: "TaskFlow Pro",
      amount: 12,
      status: "Paid",
      downloadUrl: "#",
    },
    {
      id: "3",
      date: "May 9, 2026",
      plan: "TaskFlow Pro",
      amount: 12,
      status: "Paid",
      downloadUrl: "#",
    },
  ],
};

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <section
          className="
            rounded-3xl
            border border-slate-100
            bg-white
            p-8
            shadow-sm
          "
        >
          <div className="border-b border-slate-100 pb-6">
            <h1 className="text-2xl font-bold text-slate-900">
              Billing
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Manage your plan,
              payment method,
              and invoices.
            </p>
          </div>

          <div className="mt-8 space-y-8">
            <CurrentPlanCard
              plan={billing.plan}
              price={billing.price}
              billingCycle={
                billing.billingCycle
              }
              renewDate={
                billing.renewDate
              }
            />

            <PaymentMethodCard
              brand={
                billing.paymentMethod
                  .brand
              }
              last4={
                billing.paymentMethod
                  .last4
              }
              expiry={
                billing.paymentMethod
                  .expiry
              }
            />

            <InvoiceList
              invoices={
                billing.invoices
              }
            />
          </div>
        </section>
      </div>
    </div>
  );
}

export default Billing;