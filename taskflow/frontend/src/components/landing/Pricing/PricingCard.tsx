import type { PricingPlan } from "../../../interfaces/landing";

interface PricingCardProps {
  plan: PricingPlan;
}

function PricingCard({
  plan,
}: PricingCardProps) {
  return (
    <div
      className={`relative flex flex-col justify-between rounded-2xl border bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-lg
      ${
        plan.popular
          ? "border-[#0052CC] ring-4 ring-blue-50"
          : "border-slate-200"
      }`}
    >
      {plan.popular && (
        <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0052CC] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          Most Popular
        </span>
      )}

      <div>
        <p
          className={`text-xs font-bold uppercase tracking-widest ${
            plan.popular
              ? "text-[#0052CC]"
              : "text-slate-400"
          }`}
        >
          {plan.name}
        </p>

        <div className="mt-4 flex items-end gap-1">
          <h3 className="text-4xl font-bold">
            {plan.price}
          </h3>

          <span className="pb-1 text-slate-500">
            /mo
          </span>
        </div>

        <p className="mt-2 text-sm text-slate-500">
          {plan.description}
        </p>

        <hr className="my-6" />

        <div className="space-y-3">
          {plan.features.map((feature) => (
            <div
              key={feature}
              className="flex items-center gap-3 text-sm"
            >
              <span className="font-bold text-[#0052CC]">
                ✓
              </span>

              {feature}
            </div>
          ))}
        </div>
      </div>

      <button
        className={`mt-8 rounded-lg py-3 text-sm font-semibold transition
        ${
          plan.popular
            ? "bg-[#0052CC] text-white hover:bg-[#0043A4]"
            : "bg-slate-100 hover:bg-slate-200"
        }`}
      >
        {plan.button}
      </button>
    </div>
  );
}

export default PricingCard;