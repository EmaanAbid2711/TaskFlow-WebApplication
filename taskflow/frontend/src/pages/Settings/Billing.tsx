import { useEffect, useState } from "react";
import { toast } from "sonner";

import type { BillingInfo } from "@/interfaces/billing";
import {CurrentPlanCard, PaymentMethodCard, InvoiceList} from "@/components";
import {getBillingService, updatePaymentMethodService} from "@/services/billing.service";

function Billing() {
  const [billing, setBilling] =
    useState<BillingInfo | null>(null);

  const [loading, setLoading] =
    useState(true);

  const loadBilling = async () => {
    try {
      setLoading(true);

      const response =
        await getBillingService();

      setBilling(response.data);
    } catch (error: any) {
      toast.error(
        error.response?.data?.message ??
          "Failed to load billing information."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBilling();
  }, []);

  const handleUpdatePayment =
    async () => {
      try {
        const response =
          await updatePaymentMethodService();

        toast.success(
          response.message ??
            "Payment method updated."
        );

        await loadBilling();
      } catch (error: any) {
        toast.error(
          error.response?.data?.message ??
            "Failed to update payment method."
        );
      }
    };

  if (loading) {
    return (
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="mx-auto max-w-4xl">
          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="text-slate-500">
              Loading billing information...
            </p>
          </section>
        </div>
      </div>
    );
  }

  if (!billing) {
    return (
      <div className="flex-1 overflow-y-auto p-6 md:p-10">
        <div className="mx-auto max-w-4xl">
          <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <p className="text-red-500">
              Unable to load billing information.
            </p>
          </section>
        </div>
      </div>
    );
  }

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
              billingCycle={billing.billingCycle}
              renewDate={billing.renewDate}
            />

            <PaymentMethodCard
              brand={billing.paymentMethod.brand}
              last4={billing.paymentMethod.last4}
              expiry={billing.paymentMethod.expiry}
              onUpdate={handleUpdatePayment}
            />

            <InvoiceList
              invoices={billing.invoices}
            />

          </div>
        </section>

      </div>
    </div>
  );
}

export default Billing;