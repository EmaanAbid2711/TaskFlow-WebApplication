import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {Button, Footer, Input, Logo} from "../../components";
import { forgotPasswordService } from "../../services/auth.service";

function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] =
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

    if (!email.trim()) {
      setError(
        "Please enter your email."
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await forgotPasswordService({
          email,
        });

      toast.success(
        "Reset link generated successfully."
      );

      navigate(
        "/reset-password",
        {
          state: {
            token:
              result.data.token,
          },
        }
      );
    } catch (err: any) {
      const message =
        err.response?.data
          ?.message ||
        "Failed to generate reset link.";

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
              Forgot Password?
            </h2>

            <p className="text-sm text-slate-500">
              No worries, we'll help
              you reset your password.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form
            onSubmit={
              handleSubmit
            }
            className="space-y-5"
          >
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                placeholder="Enter your work email"
                icon={
                  <Mail
                    size={18}
                  />
                }
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target
                      .value
                  )
                }
                required
                disabled={
                  loading
                }
              />
            </div>

            <Button
              type="submit"
              loading={loading}
              loadingText="Sending Reset Link..."
            >
              Send Reset Link
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

        <p className="mt-6 text-sm text-slate-500">
          Having trouble?{" "}
          <button className="underline hover:text-[#0052cc]">
            Contact Support
          </button>
        </p>

      </div>

      <Footer />
    </div>
  );
}

export default ForgotPassword;