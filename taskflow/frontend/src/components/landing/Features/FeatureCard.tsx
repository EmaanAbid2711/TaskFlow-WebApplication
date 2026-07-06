import type { Feature } from "../../../interfaces/landing";

interface FeatureCardProps {
  feature: Feature;
}

function FeatureCard({
  feature,
}: FeatureCardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
        feature.large ? "md:col-span-2" : ""
      }`}
    >
      {/* Icon */}
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-2xl">
        {feature.icon}
      </div>

      {/* Title */}
      <h3 className="mb-3 text-xl font-bold text-slate-900">
        {feature.title}
      </h3>

      {/* Description */}
      <p className="text-slate-600 leading-7">
        {feature.description}
      </p>

      {/* Preview for Kanban Card */}
      {feature.id === 1 && (
        <div className="mt-8 flex gap-3">
          <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50 p-4">
            <div className="mb-2 h-2 w-2/3 rounded bg-slate-300" />
            <div className="h-2 w-1/2 rounded bg-slate-200" />
          </div>
          <div className="flex-1 rounded-xl border border-blue-100 bg-blue-50 p-4">
            <div className="mb-2 h-2 w-3/4 rounded bg-blue-400" />
            <div className="h-2 w-1/2 rounded bg-blue-200" />
          </div>
        </div>
      )}

      {/* Preview for Integrations */}
      {feature.id === 4 && (
        <div className="mt-8 flex gap-4 rounded-xl border border-slate-100 bg-slate-50 p-5 text-3xl">

          <span>💻</span>
          <span>🗄️</span>
          <span>⚙️</span>
          <span>☁️</span>

        </div>
      )}
    </div>
  );
}

export default FeatureCard;