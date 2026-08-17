import { useEffect, useState } from "react";
import { toast } from "sonner";

import { getBilling, updateBillingPlan, updatePaymentMethod} from "@/services/billing.service";
import type { Billing as BillingData, BillingPlan} from "@/interfaces/billing";
import type { PricingPlan } from "@/interfaces/landing";
import { CurrentPlanCard, PaymentMethodCard, InvoiceList} from "@/components";
import PlanSelectionDialog from "@/components/billing/PlanSelectionDialog";
import PaymentDialog from "@/components/billing/PaymentDialog";

interface RecentPlan {
  name: string;
  price: number;
  billingCycle: string;
}

function Billing() {
  /*
   * ------------------------------------------------------------
   * Billing State
   * ------------------------------------------------------------
   */

  const [billing, setBilling] =
    useState<BillingData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [savingPlan, setSavingPlan] =
    useState(false);

  //const [savingPayment, setSavingPayment] =
  //  useState(false);

  const [recentPlan, setRecentPlan] =
    useState<RecentPlan | null>(null);

  const [planDialogOpen, setPlanDialogOpen] =
    useState(false);

  const [paymentDialogOpen, setPaymentDialogOpen] =
    useState(false);

  const [selectedPlan, setSelectedPlan] =
    useState<PricingPlan | null>(null);

  /*
   * ------------------------------------------------------------
   * Load Billing
   * ------------------------------------------------------------
   *
   * Billing is now loaded from the backend/database.
   * ------------------------------------------------------------
   */

  const loadBilling = async () => {
    try {
      setLoading(true);

      const data = await getBilling();

      setBilling(data);
    } catch (error: any) {
      console.error(
        "Failed to load billing:",
        error
      );

      toast.error(
        error.response?.data?.message ??
          "Failed to load billing information."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
   * ------------------------------------------------------------
   * Initial Billing Load
   * ------------------------------------------------------------
   */

  useEffect(() => {
    loadBilling();
  }, []);


  const handleManagePlan = () => {
    setPlanDialogOpen(true);
  };

  const handleSelectPlan = (
    plan: PricingPlan
  ) => {
    if (!billing) {
      return;
    }

    const selectedPlanName =
      plan.name.toUpperCase() as BillingPlan;

    const isCurrentPlan =
      billing.plan === selectedPlanName;

    if (isCurrentPlan) {
      return;
    }

    if (selectedPlanName === "FREE") {
      handlePlanChange(plan);
      return;
    }


    setSelectedPlan(plan);

    setPlanDialogOpen(false);

    setPaymentDialogOpen(true);
  };

  const handlePlanChange = async (
    plan: PricingPlan
  ) => {
    if (!billing || savingPlan) {
      return;
    }

    const selectedPlanName =
      plan.name.toUpperCase() as BillingPlan;

    setRecentPlan({
      name: billing.plan,
      price: billing.price,
      billingCycle:
        billing.billingCycle,
    });

    try {
      setSavingPlan(true);

      const updatedBilling =
        await updateBillingPlan(
          selectedPlanName
        );

      setBilling(updatedBilling);

      setPlanDialogOpen(false);

      toast.success(
        `${plan.name} plan updated successfully.`
      );
    } catch (error: any) {
      console.error(
        "Failed to update billing plan:",
        error
      );

      toast.error(
        error.response?.data?.message ??
          "Failed to update billing plan."
      );
    } finally {
      setSavingPlan(false);
    }
  };

  const handlePaymentSuccess = async (
  plan: PricingPlan,
  cardBrand: string,
  cardLast4: string,
  cardExpiry: string
) => {
  if (!billing || savingPlan) {
    return;
  }

  const selectedPlanName =
    plan.name.toUpperCase() as BillingPlan;

  try {
    setSavingPlan(true);

    setRecentPlan({
      name: billing.plan,
      price: billing.price,
      billingCycle: billing.billingCycle,
    });

    await updatePaymentMethod(
      cardBrand,
      cardLast4,
      cardExpiry
    );

    const updatedBilling =
      await updateBillingPlan(
        selectedPlanName
      );

    setBilling(updatedBilling);

    setPaymentDialogOpen(false);
    setSelectedPlan(null);

    toast.success(
      `${plan.name} plan activated successfully.`
    );
  } catch (error: any) {
    console.error(
      "Failed to process payment:",
      error
    );

    toast.error(
      error.response?.data?.message ??
        "Failed to process payment."
    );
  } finally {
    setSavingPlan(false);
  }
};


  /*
   * ------------------------------------------------------------
   * Loading
   * ------------------------------------------------------------
   */

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
                brand={billing.paymentMethod.brand}
                last4={billing.paymentMethod.last4}
                expiry={billing.paymentMethod.expiry}
                onUpdate={() => {
                  toast.info(
                    "Payment method update will be connected next."
                  );
                }}
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