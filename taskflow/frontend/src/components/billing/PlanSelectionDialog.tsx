import type { PricingPlan } from "@/interfaces/landing";
import PricingCard from "@/components/landing/Pricing/PricingCard";

import { pricingPlans } from "@/data/landingdata";

interface PlanSelectionDialogProps {
  open: boolean;
  currentPlan: string;
  onClose: () => void;
  onSelectPlan: (plan: PricingPlan) => void;
}

function PlanSelectionDialog({
  open,
  currentPlan,
  onClose,
  onSelectPlan,
}: PlanSelectionDialogProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="relative max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-slate-50 p-6 shadow-2xl md:p-8">
        {/* Header */}
        <div className="mb-8 flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Choose a Plan
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              Choose the plan that works best for you.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-400 transition hover:bg-white hover:text-slate-700"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-6 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
              currentPlan={currentPlan}
              onSelect={onSelectPlan}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default PlanSelectionDialog;