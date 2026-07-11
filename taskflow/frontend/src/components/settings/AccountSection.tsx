import { useMemo, useState } from "react";

import { Button, PasswordInput } from "@/components";

function AccountSection() {
  const [email] = useState(
    "alex@taskflow.app"
  );

  const [newEmail, setNewEmail] =
    useState("");

  const [
    currentPassword,
    setCurrentPassword,
  ] = useState("");

  const [
    newPassword,
    setNewPassword,
  ] = useState("");

  const [
    confirmPassword,
    setConfirmPassword,
  ] = useState("");

  const hasChanges =
    useMemo(() => {
      return (
        newEmail.trim() !== "" ||
        currentPassword.trim() !==
          "" ||
        newPassword.trim() !== "" ||
        confirmPassword.trim() !==
          ""
      );
    }, [
      newEmail,
      currentPassword,
      newPassword,
      confirmPassword,
    ]);

  const handleDiscard = () => {
    setNewEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleSave = (
    event: React.FormEvent
  ) => {
    event.preventDefault();

    console.log({
      newEmail,
      currentPassword,
      newPassword,
      confirmPassword,
    });
  };

  return (
    <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
      <div className="border-b border-slate-100 pb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Account
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Manage your login
          credentials and account
          preferences.
        </p>
      </div>

      <form
        onSubmit={handleSave}
        className="mt-8 space-y-8"
      >
        {/* Current Email */}
        <div className="grid gap-2 md:grid-cols-3 md:gap-8">
          <div>
            <label className="text-sm font-semibold text-slate-900">
              Email address
            </label>

            <p className="mt-1 text-xs text-slate-400">
              Used to sign in and
              receive notifications
            </p>
          </div>

          <div className="md:col-span-2">
            <input
              type="email"
              value={email}
              readOnly
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-100
                px-4 py-3
                text-sm
                text-slate-500
                outline-none
              "
            />
          </div>
        </div>

        {/* New Email */}
        <div className="grid gap-2 md:grid-cols-3 md:gap-8">
          <div>
            <label className="text-sm font-semibold text-slate-900">
              New Email
            </label>

            <p className="mt-1 text-xs text-slate-400">
              Requires verification
            </p>
          </div>

          <div className="md:col-span-2">
            <input
              type="email"
              placeholder="new@email.com"
              value={newEmail}
              onChange={(e) =>
                setNewEmail(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                border border-slate-200
                bg-slate-50
                px-4 py-3
                text-sm
                outline-none
                transition
                focus:border-[#0052cc]
                focus:bg-white
              "
            />
          </div>
        </div>

        <div className="border-t border-slate-100 pt-2">
          <h2 className="text-lg font-bold text-slate-900">
            Change Password
          </h2>
        </div>

        {/* Current Password */}
        <div className="grid gap-2 md:grid-cols-3 md:gap-8">
          <label className="pt-2 text-sm font-semibold text-slate-900">
            Current Password
          </label>

          <div className="md:col-span-2">
            <PasswordInput
              id="currentPassword"
              value={
                currentPassword
              }
              onChange={(e) =>
                setCurrentPassword(
                  e.target.value
                )
              }
              placeholder="Enter current password"
            />
          </div>
        </div>

        {/* New Password */}
        <div className="grid gap-2 md:grid-cols-3 md:gap-8">
          <div>
            <label className="text-sm font-semibold text-slate-900">
              New Password
            </label>

            <p className="mt-1 text-xs text-slate-400">
              Minimum 12 characters
            </p>
          </div>

          <div className="md:col-span-2">
            <PasswordInput
              id="newPassword"
              value={newPassword}
              onChange={(e) =>
                setNewPassword(
                  e.target.value
                )
              }
              placeholder="Enter new password"
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="grid gap-2 md:grid-cols-3 md:gap-8">
          <label className="pt-2 text-sm font-semibold text-slate-900">
            Confirm Password
          </label>

          <div className="md:col-span-2">
            <PasswordInput
              id="confrimPassword"
              value={
                confirmPassword
              }
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              placeholder="Confirm new password"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 border-t border-slate-100 pt-8">
          <div className="w-[220px]">
            <Button
              type="submit"
              disabled={
                !hasChanges
              }
            >
              Save Changes
            </Button>
          </div>

          <button
            type="button"
            onClick={
              handleDiscard
            }
            className="
              rounded-xl
              px-5 py-3
              text-sm
              font-medium
              text-slate-500
              transition
              hover:bg-red-50
              hover:text-red-600
            "
          >
            Discard
          </button>
        </div>
      </form>
    </section>
  );
}

export default AccountSection;