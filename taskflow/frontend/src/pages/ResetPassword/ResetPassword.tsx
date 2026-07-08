import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

import {Button, Footer, Logo, PasswordInput} from "../../components";

function ResetPassword() {
  const navigate = useNavigate();
  const [password, setPassword] =
    useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");
  const [error, setError] =
    useState("");
  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    if (password.length < 8) {
      setError(
        "Password must be at least 8 characters."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        "Passwords do not match."
      );
      return;
    }

    // Temporary frontend-only flow
    console.log({
      password,
      confirmPassword,
    });

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-tr from-[#FAF8FF] via-[#f8fafc] to-[#FAF8FF]">

      <main className="flex flex-1 flex-col items-center justify-center px-6 py-12">

        <Logo />

        <div className="mt-8 w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-slate-900">
              Reset Password
            </h2>

            <p className="text-sm text-slate-500">
              Create a new password for your
              account.
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New Password
              </label>

              <PasswordInput
                id="password"
                placeholder="Enter new password"
                value={password}
                onChange={(e) =>
                  setPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm Password
              </label>

              <PasswordInput
                id="confirmPassword"
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(
                    e.target.value
                  )
                }
                required
              />
            </div>

            <Button type="submit">
              Reset Password
            </Button>
          </form>

          <div className="my-6 border-t border-slate-200" />

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              ← Back to Login
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ResetPassword;