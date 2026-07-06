import FeatureCard from "./FeatureCard";

import { features } from "../../../data/landingdata";

function Features() {
  return (
    <section
      id="features"
      className="border-t border-slate-100 bg-white py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="mb-3 text-4xl font-bold text-slate-900">
            Engineered for Efficiency
          </h2>

          <p className="text-lg text-slate-500">
            Everything you need to ship products on time, every time.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">

          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              feature={feature}
            />
          ))}

        </div>
      </div>
    </section>
  );
}

export default Features;