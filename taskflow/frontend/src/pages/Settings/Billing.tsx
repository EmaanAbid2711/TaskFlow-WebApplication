import {
  useEffect,
  useState,
} from "react";

import { toast } from "sonner";

import type { BillingInfo } from "@/interfaces/billing";
import type { PricingPlan } from "@/interfaces/landing";

import {
  CurrentPlanCard,
  PaymentMethodCard,
  InvoiceList,
} from "@/components";

import {
  getBillingService,
  updatePaymentMethodService,
} from "@/services/billing.service";

import PlanSelectionDialog from "@/components/billing/PlanSelectionDialog";
import PaymentDialog from "@/components/billing/PaymentDialog";

interface RecentPlan {
  name: string;
  price: number;
  billingCycle: string;
}

function Billing() {
  const [billing, setBilling] =
    useState<BillingInfo | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [recentPlan, setRecentPlan] =
    useState<RecentPlan | null>(null);

  const [planDialogOpen, setPlanDialogOpen] =
    useState(false);

  const [paymentDialogOpen, setPaymentDialogOpen] =
    useState(false);

  const [selectedPlan, setSelectedPlan] =
    useState<PricingPlan | null>(null);

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

  // ------------------------------------------------------------------
  // Manage Plan
  // ------------------------------------------------------------------

  const handleManagePlan = () => {
    setPlanDialogOpen(true);
  };

  // ------------------------------------------------------------------
  // Select Plan
  // ------------------------------------------------------------------

  const handleSelectPlan = (
    plan: PricingPlan
  ) => {
    if (!billing) {
      return;
    }

    const isCurrentPlan =
      billing.plan.toLowerCase() ===
      plan.name.toLowerCase();

    if (isCurrentPlan) {
      return;
    }

    /*
     * Free plan does not require payment.
     */
    if (
      plan.name.toLowerCase() === "free"
    ) {
      handleFrontendPlanChange(plan);
      return;
    }

    /*
     * Paid plans open payment dialog.
     */
    setSelectedPlan(plan);

    setPlanDialogOpen(false);

    setPaymentDialogOpen(true);
  };

  // ------------------------------------------------------------------
  // Frontend-only Plan Change
  // ------------------------------------------------------------------

  const handleFrontendPlanChange = (
    plan: PricingPlan
  ) => {
    if (!billing) {
      return;
    }

    /*
     * Save current plan as recent plan
     * before changing it.
     */
    setRecentPlan({
      name: billing.plan,
      price: billing.price,
      billingCycle:
        billing.billingCycle,
    });

    const newPrice = Number(
      plan.price.replace("$", "")
    );

    setBilling({
      ...billing,
      plan: plan.name,
      price: newPrice,
      billingCycle: "Monthly",
      renewDate:
        newPrice === 0
          ? ""
          : getNextRenewalDate(),
    });

    setPlanDialogOpen(false);

    toast.success(
      `${plan.name} plan selected successfully.`
    );
  };

  // ------------------------------------------------------------------
  // Payment Success
  // ------------------------------------------------------------------

  const handlePaymentSuccess = (
    plan: PricingPlan
  ) => {
    handleFrontendPlanChange(plan);

    setPaymentDialogOpen(false);

    setSelectedPlan(null);
  };

  // ------------------------------------------------------------------
  // Renewal Date
  // ------------------------------------------------------------------

  const getNextRenewalDate = () => {
    const date = new Date();

    date.setMonth(
      date.getMonth() + 1
    );

    return date.toISOString();
  };

  // ------------------------------------------------------------------
  // Update Payment Method
  // ------------------------------------------------------------------

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

  // ------------------------------------------------------------------
  // Loading
  // ------------------------------------------------------------------

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

  // ------------------------------------------------------------------
  // Error
  // ------------------------------------------------------------------

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

  // ------------------------------------------------------------------
  // Page
  // ------------------------------------------------------------------

  return (
    <>
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
                onManagePlan={
                  handleManagePlan
                }
              />

              {/* Recent Plan */}
              {recentPlan && (
                <section
                  className="
                    rounded-2xl
                    border border-slate-200
                    bg-slate-50
                    p-5
                  "
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Recent Plan
                      </p>

                      <h3 className="mt-1 text-lg font-bold text-slate-900">
                        {recentPlan.name}
                      </h3>

                      <p className="mt-1 text-sm text-slate-500">
                        ${recentPlan.price}
                        /month
                      </p>
                    </div>

                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500">
                      Previous plan
                    </span>
                  </div>
                </section>
              )}

              <PaymentMethodCard
                brand={
                  billing.paymentMethod.brand
                }
                last4={
                  billing.paymentMethod.last4
                }
                expiry={
                  billing.paymentMethod.expiry
                }
                onUpdate={
                  handleUpdatePayment
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

      {/* Plan Selection */}
      <PlanSelectionDialog
        open={planDialogOpen}
        currentPlan={billing.plan}
        onClose={() =>
          setPlanDialogOpen(false)
        }
        onSelectPlan={
          handleSelectPlan
        }
      />

      {/* Payment */}
      <PaymentDialog
        open={paymentDialogOpen}
        plan={selectedPlan}
        onClose={() => {
          setPaymentDialogOpen(false);
          setSelectedPlan(null);
        }}
        onSuccess={
          handlePaymentSuccess
        }
      />
    </>
  );
}

export default Billing;