import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

import type { PricingPlan } from "@/interfaces/landing";

interface PaymentDialogProps {
  open: boolean;
  plan: PricingPlan | null;
  onClose: () => void;
  onSuccess: (plan: PricingPlan) => void;
}

function PaymentDialog({
  open,
  plan,
  onClose,
  onSuccess,
}: PaymentDialogProps) {
  const [cardholderName, setCardholderName] =
    useState("");

  const [cardNumber, setCardNumber] =
    useState("");

  const [expiry, setExpiry] =
    useState("");

  const [cvv, setCvv] =
    useState("");

  const [processing, setProcessing] =
    useState(false);

  if (!open || !plan) {
    return null;
  }

  const numericPrice =
    Number(
      plan.price.replace("$", "")
    );

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (
      !cardholderName.trim() ||
      !cardNumber.trim() ||
      !expiry.trim() ||
      !cvv.trim()
    ) {
      return;
    }

    setProcessing(true);

    /*
     * Phase 1:
     * This is only a frontend payment simulation.
     *
     * We will connect this to the backend
     * in Phase 3.
     */
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );

    setProcessing(false);

    onSuccess(plan);

    setCardholderName("");
    setCardNumber("");
    setExpiry("");
    setCvv("");
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Complete Payment
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Subscribe to the {plan.name} plan.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={processing}
            className="flex h-9 w-9 items-center justify-center rounded-full text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            ×
          </button>
        </div>

        {/* Selected Plan */}
        <div className="mx-6 mt-6 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50 p-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-[#0052CC]">
              Selected Plan
            </p>

            <p className="mt-1 text-lg font-bold text-slate-900">
              {plan.name}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xl font-bold text-slate-900">
              {plan.price}
            </p>

            <p className="text-xs text-slate-500">
              per month
            </p>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >
          <div>
            <label
              htmlFor="cardholder-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Cardholder Name
            </label>

            <input
              id="cardholder-name"
              type="text"
              value={cardholderName}
              onChange={(event) =>
                setCardholderName(
                  event.target.value
                )
              }
              placeholder="John Doe"
              className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
              required
            />
          </div>

          <div>
            <label
              htmlFor="card-number"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Card Number
            </label>

            <div className="relative">
              <CreditCard
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="card-number"
                type="text"
                inputMode="numeric"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(
                    event.target.value
                  )
                }
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="card-expiry"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Expiry
              </label>

              <input
                id="card-expiry"
                type="text"
                inputMode="numeric"
                value={expiry}
                onChange={(event) =>
                  setExpiry(
                    event.target.value
                  )
                }
                placeholder="MM/YY"
                maxLength={5}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            <div>
              <label
                htmlFor="card-cvv"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                CVV
              </label>

              <input
                id="card-cvv"
                type="password"
                inputMode="numeric"
                value={cvv}
                onChange={(event) =>
                  setCvv(event.target.value)
                }
                placeholder="123"
                maxLength={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <Lock size={14} />

            <span>
              Your payment information is
              securely handled.
            </span>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              disabled={processing}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={processing}
              className="flex-1 rounded-lg bg-[#0052CC] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0043A4] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {processing
                ? "Processing..."
                : `Pay $${numericPrice}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentDialog;