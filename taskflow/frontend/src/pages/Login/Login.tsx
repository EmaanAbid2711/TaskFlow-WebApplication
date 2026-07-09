import { useState } from "react";
import { Mail } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import {Button, Input, Logo, PasswordInput, Footer} from "@/components";
import { loginService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !email.trim() ||
      !password.trim()
    ) {
      setError(
        "Please fill in all fields."
      );
      return;
    }

    try {
      setLoading(true);

      const result =
        await loginService({
          email,
          password,
        });

      setUser(result.data.user);

      setSuccess(
        "Login successful."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          "Login failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-tr from-[#FAF8FF] via-[#f8fafc] to-[#FAF8FF]">

      {/* Main Content */}
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">

        <Logo />

        {/* Login Card */}
        <div className="mt-8 w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

          <h2 className="mb-2 text-2xl font-semibold text-slate-900">
            Welcome Back
          </h2>

          <p className="mb-6 text-sm text-slate-500">
            Login to continue to your TaskFlow workspace.
          </p>

          {error && (
            <div className="mb-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-600">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* Email */}
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
                placeholder="name@company.com"
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                required
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-medium text-[#0052cc] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <PasswordInput
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                disabled={loading}
              />
            </div>

            {/* Login Button */}
            <Button
              type="submit"
              loading={loading}
              loadingText="Logging In..."
            >
              Login to Dashboard
            </Button>

            {/* Divider */}
            <div className="flex items-center">
              <div className="h-px flex-1 bg-slate-200" />

              <span className="mx-4 text-xs text-slate-400">
                Or continue with
              </span>

              <div className="h-px flex-1 bg-slate-200" />
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-3 text-sm font-medium transition hover:bg-slate-100"
              >
                <FcGoogle size={20} />
                Google
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-3 text-sm font-medium transition hover:bg-slate-100"
              >
                <FaGithub size={18} />
                GitHub
              </button>

            </div>
          </form>
        </div>

        {/* Signup Link */}
        <p className="mt-6 text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="font-medium text-[#0052cc] hover:underline"
          >
            Sign up for free
          </Link>
        </p>
      </div>

      <Footer />
    </div>
  );
}

export default Login;