import {useEffect, useMemo, useState} from "react";
import { toast } from "sonner";

import {Button, PasswordInput} from "@/components";
import {getAccountService, updateEmailService, updatePasswordService} from "@/services/account.service";

function AccountSection() {
  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

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

  const [errors, setErrors] =
    useState({
      newEmail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  useEffect(() => {
    loadAccount();
  }, []);

  const loadAccount =
    async () => {
      try {
        setLoading(true);

        const response =
          await getAccountService();

        setEmail(
          response.data.email
        );
      } catch {
        toast.error(
          "Failed to load account."
        );
      } finally {
        setLoading(false);
      }
    };


  const resetForm = () => {
    setNewEmail("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");

    setErrors({
      newEmail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const validate = () => {
    const newErrors = {
      newEmail: "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    let valid = true;

    // Email Validation
    if (
      newEmail &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        newEmail
      )
    ) {
      newErrors.newEmail =
        "Please enter a valid email.";

      valid = false;
    }

    // Password Validation
    const changingPassword =
      currentPassword ||
      newPassword ||
      confirmPassword;

    if (changingPassword) {
      if (
        !currentPassword.trim()
      ) {
        newErrors.currentPassword =
          "Current password is required.";

        valid = false;
      }

      if (
        !newPassword.trim()
      ) {
        newErrors.newPassword =
          "New password is required.";

        valid = false;
      } else if (
        newPassword.length < 8
      ) {
        newErrors.newPassword =
          "Password must contain at least 8 characters.";

        valid = false;
      }

      if (
        !confirmPassword.trim()
      ) {
        newErrors.confirmPassword =
          "Please confirm password.";

        valid = false;
      } else if (
        newPassword !==
        confirmPassword
      ) {
        newErrors.confirmPassword =
          "Passwords do not match.";

        valid = false;
      }
    }

    setErrors(newErrors);
    return valid;
  };

  const hasChanges =
    useMemo(() => {
      return (
        newEmail.trim() !== "" ||
        currentPassword.trim() !== "" ||
        newPassword.trim() !==  "" ||
        confirmPassword.trim() !==  ""
      );
    }, [
      newEmail,
      currentPassword,
      newPassword,
      confirmPassword,
    ]);

  const handleSave =
    async (
      e: React.FormEvent
    ) => {
      e.preventDefault();

      if (!validate()) {
        toast.error(
          "Please fix the errors before saving."
        );
        return;
      }
      try {
        if (
          newEmail.trim()
        ) {
          await updateEmailService(
            newEmail
          );
        }

        if (
          currentPassword &&
          newPassword
        ) {
          await updatePasswordService(
            currentPassword,
            newPassword
          );
        }

        toast.success(
          "Account updated successfully."
        );

        resetForm();

        await loadAccount();
      } catch (
        error: any
      ) {
        toast.error(
          error.response?.data
            ?.message ??
            "Failed to update account."
        );
      }
    };

  const handleDiscard = () => {
    resetForm();

    toast.success(
      "Changes discarded."
    );
  };

  if (loading) {
    return (
      <section className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
        <p className="text-slate-500">
          Loading account...
        </p>
      </section>
    );
  }

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
        onSubmit={
          handleSave
        }
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
              className="  w-full  rounded-xl  border border-slate-200  bg-slate-100  px-4 py-3  text-sm  text-slate-500  outline-none"
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
              value={
                newEmail
              }
              onChange={(
                e
              ) =>
                setNewEmail(
                  e.target.value
                )
              }
              className="  w-full  rounded-xl  border border-slate-200  bg-slate-50  px-4 py-3  text-sm  outline-none  transition  focus:border-[#0052cc]  focus:bg-white"
            />
            {errors.newEmail && (
              <p className="mt-2 text-sm text-red-500">
                {
                  errors.newEmail
                }
              </p>
            )}
          </div>
        </div>

        {/* Password Section */}
        <div className="border-t border-slate-100 pt-2">
          <h2 className="text-lg font-bold text-slate-900">
            Change Password
          </h2>
        </div>

        {[
          {
            id: "current-password",
            label:  "Current Password",
            value:  currentPassword,
            set:  setCurrentPassword,
            error:  errors.currentPassword,
            placeholder:  "Enter current password",
          },
          {
            id: "new-password",
            label:  "New Password",
            value:  newPassword,
            set:  setNewPassword,
            error:  errors.newPassword,
            placeholder:  "Enter new password",
          },
          {
            id: "confirm-password",
            label:  "Confirm Password",
            value:  confirmPassword,
            set:  setConfirmPassword,
            error:  errors.confirmPassword,
            placeholder:  "Confirm new password",
          },
        ].map(
          (item) => (
            <div
              key={
                item.id
              }
              className="grid gap-2 md:grid-cols-3 md:gap-8"
            >
              <label className="pt-2 text-sm font-semibold text-slate-900">
                {
                  item.label
                }
              </label>

              <div className="md:col-span-2">
                <PasswordInput
                  id={
                    item.id
                  }
                  value={
                    item.value
                  }
                  onChange={(
                    e
                  ) =>
                    item.set(
                      e.target
                        .value
                    )
                  }
                  placeholder={
                    item.placeholder
                  }
                />

                {item.error && (
                  <p className="mt-2 text-sm text-red-500">
                    {
                      item.error
                    }
                  </p>
                )}
              </div>
            </div>
          )
        )}

        {/* Buttons */}
        <div className="flex gap-4 border-t border-slate-100 pt-8">
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
            className="  rounded-xl px-5 py-3  text-sm  font-medium  text-slate-500  transition  hover:bg-red-50  hover:text-red-600"
          >
            Discard
          </button>
        </div>
      </form>
    </section>
  );
}

export default AccountSection;