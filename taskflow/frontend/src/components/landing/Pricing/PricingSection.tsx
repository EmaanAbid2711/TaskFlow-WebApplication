import PricingCard from "./PricingCard";

import { pricingPlans } from "../../../data/landingdata";

function PricingSection() {
  return (
    <section
      id="pricing"
      className="bg-white py-24"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-bold">
            Scalable Pricing
          </h2>

          <p className="mt-3 text-slate-500">
            Simple plans for teams of all sizes.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          {pricingPlans.map((plan) => (
            <PricingCard
              key={plan.name}
              plan={plan}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default PricingSection;