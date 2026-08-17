import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

import type { PricingPlan } from "@/interfaces/landing";

interface PaymentDialogProps {
  open: boolean;
  plan: PricingPlan | null;
  onClose: () => void;
  onSuccess: (
    plan: PricingPlan,
    cardBrand: string,
    cardLast4: string,
    cardExpiry: string
  ) => Promise<void> | void;
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

  /*
   * ------------------------------------------------------------
   * Don't render the dialog when it is closed
   * or when no plan has been selected.
   * ------------------------------------------------------------
   */

  if (!open || !plan) {
    return null;
  }

  const numericPrice = Number(
    plan.price.replace("$", "")
  );

  /*
   * ------------------------------------------------------------
   * Card Number Formatting
   * ------------------------------------------------------------
   *
   * Keeps only numeric characters and limits the input
   * to 16 digits.
   *
   * Example:
   * 4242 4242 4242 4242
   * ------------------------------------------------------------
   */

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 16);

    const formattedValue =
      numericValue.match(/.{1,4}/g)?.join(" ") ??
      "";

    setCardNumber(formattedValue);
  };

  /*
   * ------------------------------------------------------------
   * Expiry Formatting
   * ------------------------------------------------------------
   *
   * Example:
   * 1228 -> 12/28
   * ------------------------------------------------------------
   */

  const handleExpiryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 4);

    let formattedValue = numericValue;

    if (numericValue.length > 2) {
      formattedValue =
        `${numericValue.slice(0, 2)}/${numericValue.slice(2)}`;
    }

    setExpiry(formattedValue);
  };

  /*
   * ------------------------------------------------------------
   * CVV Formatting
   * ------------------------------------------------------------
   */

  const handleCvvChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const numericValue =
      event.target.value
        .replace(/\D/g, "")
        .slice(0, 4);

    setCvv(numericValue);
  };

  /*
   * ------------------------------------------------------------
   * Detect Card Brand
   * ------------------------------------------------------------
   *
   * This is only used to store the card brand.
   *
   * It is NOT a payment processor and does not perform
   * any real card verification.
   * ------------------------------------------------------------
   */

  const detectCardBrand = (
    cardNumberValue: string
  ): string => {
    const number =
      cardNumberValue.replace(/\D/g, "");

    if (/^4/.test(number)) {
      return "Visa";
    }

    if (
      /^(5[1-5]|2[2-7])/.test(number)
    ) {
      return "Mastercard";
    }

    if (
      /^(34|37)/.test(number)
    ) {
      return "American Express";
    }

    if (
      /^6(?:011|5)/.test(number)
    ) {
      return "Discover";
    }

    return "Card";
  };

  /*
   * ------------------------------------------------------------
   * Submit Payment
   * ------------------------------------------------------------
   */

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    /*
     * Basic validation.
     */

    if (
      !cardholderName.trim() ||
      !cardNumber.trim() ||
      !expiry.trim() ||
      !cvv.trim()
    ) {
      return;
    }

    const cleanCardNumber =
      cardNumber.replace(/\D/g, "");

    /*
     * Validate card number.
     */

    if (cleanCardNumber.length < 13) {
      return;
    }

    /*
     * Validate expiry format.
     */

    if (
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
        expiry
      )
    ) {
      return;
    }

    /*
     * Validate CVV.
     */

    if (!/^\d{3,4}$/.test(cvv)) {
      return;
    }

    /*
     * Extract ONLY the last four digits.
     *
     * The full card number will NOT be sent
     * to the backend.
     */

    const cardLast4 =
      cleanCardNumber.slice(-4);

    /*
     * Detect the card brand.
     */

    const cardBrand =
      detectCardBrand(
        cleanCardNumber
      );

    try {
      setProcessing(true);

      /*
       * Pass only safe billing information
       * to the parent component.
       *
       * We do NOT send:
       *
       * - full card number
       * - CVV
       * - cardholder name
       */

      await onSuccess(
        plan,
        cardBrand,
        cardLast4,
        expiry
      );

      /*
       * Clear sensitive information immediately
       * after successful submission.
       */

      setCardholderName("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } catch (error) {
      /*
       * The parent handles the actual error toast.
       */

      console.error(
        "Payment submission failed:",
        error
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* ----------------------------------------------------
            Header
            ---------------------------------------------------- */}

        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Complete Payment
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Subscribe to the{" "}
              {plan.name} plan.
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

        {/* ----------------------------------------------------
            Selected Plan
            ---------------------------------------------------- */}

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

        {/* ----------------------------------------------------
            Form
            ---------------------------------------------------- */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Cardholder Name */}

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

          {/* Card Number */}

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
                autoComplete="cc-number"
                value={cardNumber}
                onChange={
                  handleCardNumberChange
                }
                placeholder="4242 4242 4242 4242"
                maxLength={19}
                className="w-full rounded-lg border border-slate-200 py-2.5 pl-10 pr-3 text-sm outline-none transition focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>

          {/* Expiry + CVV */}

          <div className="grid grid-cols-2 gap-4">

            {/* Expiry */}

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
                autoComplete="cc-exp"
                value={expiry}
                onChange={
                  handleExpiryChange
                }
                placeholder="MM/YY"
                maxLength={5}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>

            {/* CVV */}

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
                autoComplete="cc-csc"
                value={cvv}
                onChange={
                  handleCvvChange
                }
                placeholder="123"
                maxLength={4}
                className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-[#0052CC] focus:ring-2 focus:ring-blue-100"
                required
              />
            </div>
          </div>

          {/* Security Message */}

          <div className="flex items-center gap-2 rounded-lg bg-slate-50 p-3 text-xs text-slate-500">
            <Lock size={14} />

            <span>
              Your payment information is
              securely handled.
            </span>
          </div>

          {/* Buttons */}

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