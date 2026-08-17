import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  getBilling,
  updateBillingPlan,
  updatePaymentMethod,
} from "@/services/billing.service";

import type {
  Billing as BillingData,
  BillingPlan,
} from "@/interfaces/billing";

import type { PricingPlan } from "@/interfaces/landing";

import {
  CurrentPlanCard,
  PaymentMethodCard,
  InvoiceList,
} from "@/components";

import PlanSelectionDialog from "@/components/billing/PlanSelectionDialog";
import PaymentDialog from "@/components/billing/PaymentDialog";
import UpdatePaymentMethodDialog from "@/components/billing/UpdatePaymentMethodDialog";

interface RecentPlan {
  name: string;
  price: number;
  billingCycle: string;
}

function Billing() {
  /*
   * ============================================================
   * Billing State
   * ============================================================
   */

  const [billing, setBilling] =
    useState<BillingData | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [savingPlan, setSavingPlan] =
    useState(false);

  const [savingPayment, setSavingPayment] =
    useState(false);

  /*
   * ============================================================
   * UI State
   * ============================================================
   */

  const [recentPlan, setRecentPlan] =
    useState<RecentPlan | null>(null);

  const [planDialogOpen, setPlanDialogOpen] =
    useState(false);

  const [paymentDialogOpen, setPaymentDialogOpen] =
    useState(false);

  const [
    updatePaymentDialogOpen,
    setUpdatePaymentDialogOpen,
  ] = useState(false);

  const [selectedPlan, setSelectedPlan] =
    useState<PricingPlan | null>(null);

  /*
   * ============================================================
   * Load Billing
   * ============================================================
   *
   * Gets the user's billing information from the backend.
   * ============================================================
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
   * ============================================================
   * Initial Load
   * ============================================================
   */

  useEffect(() => {
    loadBilling();
  }, []);

  /*
   * ============================================================
   * Manage Plan
   * ============================================================
   */

  const handleManagePlan = () => {
    setPlanDialogOpen(true);
  };

  /*
   * ============================================================
   * Select Plan
   * ============================================================
   */

  const handleSelectPlan = (
    plan: PricingPlan
  ) => {
    if (!billing || savingPlan) {
      return;
    }

    const selectedPlanName =
      plan.name.toUpperCase() as BillingPlan;

    /*
     * Don't do anything if the user selected
     * their current plan.
     */

    const isCurrentPlan =
      billing.plan === selectedPlanName;

    if (isCurrentPlan) {
      return;
    }

    /*
     * ----------------------------------------------------------
     * FREE PLAN
     * ----------------------------------------------------------
     *
     * FREE does not require payment.
     * Update the backend immediately.
     * ----------------------------------------------------------
     */

    if (selectedPlanName === "FREE") {
      handlePlanChange(plan);
      return;
    }

    /*
     * ----------------------------------------------------------
     * PAID PLAN
     * ----------------------------------------------------------
     *
     * PRO / ENTERPRISE require payment information.
     * Open PaymentDialog first.
     * ----------------------------------------------------------
     */

    setSelectedPlan(plan);

    setPlanDialogOpen(false);

    setPaymentDialogOpen(true);
  };

  /*
   * ============================================================
   * Change Plan
   * ============================================================
   *
   * Used for FREE plan changes.
   *
   * For paid plans, this is called after PaymentDialog
   * successfully collects the payment information.
   * ============================================================
   */

  const handlePlanChange = async (
    plan: PricingPlan
  ) => {
    if (!billing || savingPlan) {
      return;
    }

    const selectedPlanName =
      plan.name.toUpperCase() as BillingPlan;

    /*
     * Save the current plan as the recent/previous plan.
     */

    setRecentPlan({
      name: billing.plan,
      price: billing.price,
      billingCycle:
        billing.billingCycle,
    });

    try {
      setSavingPlan(true);

      /*
       * Update plan in backend.
       */

      const updatedBilling =
        await updateBillingPlan(
          selectedPlanName
        );

      /*
       * Replace local state with backend response.
       */

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

      /*
       * If the request failed, remove the
       * recent-plan entry we just created.
       */

      setRecentPlan(null);

      toast.error(
        error.response?.data?.message ??
          "Failed to update billing plan."
      );
    } finally {
      setSavingPlan(false);
    }
  };

  /*
   * ============================================================
   * Payment Success
   * ============================================================
   *
   * Called by PaymentDialog.
   *
   * The dialog gives us only:
   *
   * - cardBrand
   * - cardLast4
   * - cardExpiry
   *
   * The full card number and CVV are never sent
   * to our backend.
   * ============================================================
   */

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

      /*
       * Save the current plan as the previous plan.
       */

      setRecentPlan({
        name: billing.plan,
        price: billing.price,
        billingCycle:
          billing.billingCycle,
      });

      /*
       * --------------------------------------------------------
       * Step 1: Save Payment Method
       * --------------------------------------------------------
       *
       * Only safe card information is sent.
       */

      await updatePaymentMethod(
        cardBrand,
        cardLast4,
        cardExpiry
      );

      /*
       * --------------------------------------------------------
       * Step 2: Activate Selected Plan
       * --------------------------------------------------------
       *
       * The backend will create the invoice for
       * paid plans.
       */

      const updatedBilling =
        await updateBillingPlan(
          selectedPlanName
        );

      /*
       * Update UI with backend response.
       */

      setBilling(updatedBilling);

      /*
       * Close payment dialog.
       */

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

      /*
       * Don't leave a fake recent-plan entry
       * when the operation failed.
       */

      setRecentPlan(null);

      toast.error(
        error.response?.data?.message ??
          "Failed to process payment."
      );
    } finally {
      setSavingPlan(false);
    }
  };

  /*
   * ============================================================
   * Update Existing Payment Method
   * ============================================================
   *
   * Called by UpdatePaymentMethodDialog.
   *
   * Only cardBrand, cardLast4 and cardExpiry
   * are sent to the backend.
   * ============================================================
   */

  const handleUpdatePayment = async (
    cardBrand: string,
    cardLast4: string,
    cardExpiry: string
  ) => {
    if (savingPayment) {
      return;
    }

    try {
      setSavingPayment(true);

      /*
       * Update payment method in backend.
       */

      const updatedBilling =
        await updatePaymentMethod(
          cardBrand,
          cardLast4,
          cardExpiry
        );

      /*
       * Update local UI.
       */

      setBilling(updatedBilling);

      /*
       * Close dialog after successful update.
       */

      setUpdatePaymentDialogOpen(false);

      toast.success(
        "Payment method updated successfully."
      );
    } catch (error: any) {
      console.error(
        "Failed to update payment method:",
        error
      );

      toast.error(
        error.response?.data?.message ??
          "Failed to update payment method."
      );

      /*
       * Re-throw so the dialog knows that
       * the operation failed.
       */

      throw error;
    } finally {
      setSavingPayment(false);
    }
  };

  /*
   * ============================================================
   * Loading State
   * ============================================================
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

  /*
   * ============================================================
   * Error State
   * ============================================================
   */

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

  /*
   * ============================================================
   * Page
   * ============================================================
   */

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
            {/* --------------------------------------------------
                Header
                -------------------------------------------------- */}

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

              {/* ------------------------------------------------
                  Current Plan
                  ------------------------------------------------ */}

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

              {/* ------------------------------------------------
                  Recent Plan
                  ------------------------------------------------ */}

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

              {/* ------------------------------------------------
                  Payment Method
                  ------------------------------------------------ */}

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
                onUpdate={() =>
                  setUpdatePaymentDialogOpen(
                    true
                  )
                }
              />

              {/* ------------------------------------------------
                  Invoices
                  ------------------------------------------------ */}

              <InvoiceList
                invoices={
                  billing.invoices
                }
              />

            </div>
          </section>
        </div>
      </div>

      {/* ========================================================
          Plan Selection Dialog
          ======================================================== */}

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

      {/* ========================================================
          Payment Dialog
          ========================================================
          
          Used when subscribing to a paid plan.
          ======================================================== */}

      <PaymentDialog
        open={paymentDialogOpen}
        plan={selectedPlan}
        onClose={() => {
          if (savingPlan) {
            return;
          }

          setPaymentDialogOpen(false);
          setSelectedPlan(null);
        }}
        onSuccess={
          handlePaymentSuccess
        }
      />

      {/* ========================================================
          Update Payment Method Dialog
          ========================================================
          
          Used when the user clicks "Update" on the existing
          payment method.
          ======================================================== */}

      <UpdatePaymentMethodDialog
        open={
          updatePaymentDialogOpen
        }
        currentBrand={
          billing.paymentMethod.brand
        }
        currentLast4={
          billing.paymentMethod.last4
        }
        currentExpiry={
          billing.paymentMethod.expiry
        }
        onClose={() => {
          if (savingPayment) {
            return;
          }

          setUpdatePaymentDialogOpen(
            false
          );
        }}
        onUpdate={
          handleUpdatePayment
        }
      />
    </>
  );
}

export default Billing;