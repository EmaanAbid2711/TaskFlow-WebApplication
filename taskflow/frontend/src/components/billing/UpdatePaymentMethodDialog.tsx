import { useState } from "react";
import { CreditCard, Lock } from "lucide-react";

interface UpdatePaymentMethodDialogProps {
  open: boolean;
  currentBrand: string;
  currentLast4: string;
  currentExpiry: string;
  onClose: () => void;
  onUpdate: (
    cardBrand: string,
    cardLast4: string,
    cardExpiry: string
  ) => Promise<void> | void;
}

function UpdatePaymentMethodDialog({
  open,
  currentBrand,
  currentLast4,
  currentExpiry,
  onClose,
  onUpdate,
}: UpdatePaymentMethodDialogProps) {
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

  if (!open) {
    return null;
  }

  /*
   * ------------------------------------------------------------
   * Card Number Formatting
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

    if (/^(34|37)/.test(number)) {
      return "American Express";
    }

    if (/^6(?:011|5)/.test(number)) {
      return "Discover";
    }

    return "Card";
  };

  /*
   * ------------------------------------------------------------
   * Submit
   * ------------------------------------------------------------
   */

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

    const cleanCardNumber =
      cardNumber.replace(/\D/g, "");

    /*
     * Basic card validation.
     */

    if (cleanCardNumber.length < 13) {
      return;
    }

    /*
     * Validate MM/YY.
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
     * Only the last four digits are sent
     * to our backend.
     */

    const cardLast4 =
      cleanCardNumber.slice(-4);

    const cardBrand =
      detectCardBrand(cleanCardNumber);

    try {
      setProcessing(true);

      /*
       * IMPORTANT:
       *
       * We send only:
       * - cardBrand
       * - cardLast4
       * - cardExpiry
       *
       * Full card number, CVV and cardholder
       * name are NOT sent to the backend.
       */

      await onUpdate(
        cardBrand,
        cardLast4,
        expiry
      );

      /*
       * Clear sensitive information.
       */

      setCardholderName("");
      setCardNumber("");
      setExpiry("");
      setCvv("");
    } catch (error) {
      console.error(
        "Failed to update payment method:",
        error
      );
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-start justify-between border-b border-slate-100 p-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              Update Payment Method
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Update the card used for your
              subscription.
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

        {/* Current Payment Method */}

        <div className="mx-6 mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
            Current Payment Method
          </p>

          <div className="mt-2 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                {currentBrand || "No card"}
              </p>

              {currentLast4 && (
                <p className="mt-1 text-xs text-slate-500">
                  Ending in {currentLast4}
                </p>
              )}
            </div>

            {currentExpiry && (
              <p className="text-xs text-slate-500">
                Expires {currentExpiry}
              </p>
            )}
          </div>
        </div>

        {/* Form */}

        <form
          onSubmit={handleSubmit}
          className="space-y-5 p-6"
        >

          {/* Cardholder Name */}

          <div>
            <label
              htmlFor="update-cardholder-name"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Cardholder Name
            </label>

            <input
              id="update-cardholder-name"
              type="text"
              autoComplete="cc-name"
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
              htmlFor="update-card-number"
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
                id="update-card-number"
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

            <div>
              <label
                htmlFor="update-card-expiry"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Expiry
              </label>

              <input
                id="update-card-expiry"
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

            <div>
              <label
                htmlFor="update-card-cvv"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                CVV
              </label>

              <input
                id="update-card-cvv"
                type="password"
                inputMode="numeric"
                autoComplete="cc-csc"
                value={cvv}
                onChange={handleCvvChange}
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
                ? "Updating..."
                : "Update Card"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdatePaymentMethodDialog;