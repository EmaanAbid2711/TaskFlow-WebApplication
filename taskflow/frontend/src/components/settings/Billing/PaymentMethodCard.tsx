interface Props {
  brand: string;
  last4: string;
  expiry: string;
}

function PaymentMethodCard({
  brand,
  last4,
  expiry,
}: Props) {
  return (
    <div
      className="
        flex flex-col gap-4
        rounded-3xl
        border border-slate-100
        bg-white
        p-6
        shadow-sm
        sm:flex-row
        sm:items-center
        sm:justify-between
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            rounded-lg
            border border-slate-200
            bg-slate-50
            px-3
            py-2
            text-xs
            font-bold
            tracking-widest
            text-slate-500
          "
        >
          {brand}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            {brand} ending in {last4}
          </h3>

          <p className="mt-1 text-xs text-slate-400">
            Expires {expiry}
          </p>
        </div>
      </div>

      <button
        className="
          rounded-xl
          border border-slate-200
          px-4 py-2
          text-sm
          font-medium
          text-slate-700
          transition
          hover:bg-slate-50
        "
      >
        Update
      </button>
    </div>
  );
}

export default PaymentMethodCard;