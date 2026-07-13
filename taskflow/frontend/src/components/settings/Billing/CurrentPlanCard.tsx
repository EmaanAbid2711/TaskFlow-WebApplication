interface Props {
  plan: string;
  price: number;
  billingCycle: string;
  renewDate: string;
}

function CurrentPlanCard({
  plan,
  price,
  billingCycle,
  renewDate,
}: Props) {
  return (
    <div
      className="
        flex flex-col gap-4
        rounded-3xl
        border border-slate-100
        bg-[#f8faff]
        p-6
        sm:flex-row
        sm:items-start
        sm:justify-between
      "
    >
      <div>
        <h2 className="text-lg font-bold text-slate-900">
          {plan}
        </h2>

        <p className="mt-2 text-sm text-slate-500">
          ${price}/month ·
          {" "}
          {billingCycle}
          {" "}
          · Renews
          {" "}
          {renewDate}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Unlimited projects",
            "10 GB storage",
            "Priority support",
            "Advanced analytics",
          ].map((feature) => (
            <span
              key={feature}
              className="
                rounded-full
                bg-blue-50
                px-3
                py-1
                text-xs
                font-medium
                text-[#0052cc]
              "
            >
              {feature}
            </span>
          ))}
        </div>
      </div>

      <button
        className="
          rounded-xl
          border border-slate-200
          bg-white
          px-4 py-2
          text-sm
          font-medium
          text-[#0052cc]
          transition
          hover:bg-slate-50
        "
      >
        Manage Plan
      </button>
    </div>
  );
}

export default CurrentPlanCard;