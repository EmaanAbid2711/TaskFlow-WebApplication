import { useState, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {Button, Footer, Logo, PasswordInput} from "../../components";
import { resetPasswordService } from "../../services/auth.service";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const token =
    location.state?.token as string | undefined;

  const [password, setPassword] =
    useState("");

  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (!token) {
      setError(
        "Reset token is missing. Please try again."
      );
      return;
    }

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

    try {
      setLoading(true);

      const result =
        await resetPasswordService(
          token,
          {
            password,
          }
        );

      toast.success(
        result.message
      );

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Failed to reset password.";

      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-tr from-[#FAF8FF] via-[#f8fafc] to-[#FAF8FF]">

      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">

        <Logo />

        <div className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-slate-900">
              Reset Password
            </h2>

            <p className="text-sm text-slate-500">
              Enter your new password below.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
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
              disabled={loading}
            />

            <PasswordInput
              id="confirm-password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
              disabled={loading}
            />

            <Button
              type="submit"
              loading={loading}
              loadingText="Resetting Password..."
            >
              Reset Password
            </Button>
          </form>

          <div className="my-6 border-t border-slate-200" />

          <div className="text-center">
            <Link
              to="/login"
              className="text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              ← Back to Login
            </Link>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ResetPassword;