import { useState, type FormEvent } from "react";
import { Mail, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import {Button, Footer, Input, Logo, PasswordInput} from "../../components";

import { signupService } from "../../services/auth.service";
import { useAuth } from "../../context/AuthContext";

function Signup() {
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      setError("Please fill in all fields.");
      return;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
      
    if (!passwordRegex.test(password)) {
      setError(
        "Password must be at least 8 characters and include one uppercase letter, one number, and one special character."
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const result = await signupService({
        name,
        email,
        password,
      });

      setUser(result.data.user);

      setSuccess(
        "Account created successfully."
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err: any) {
      const message =
        err.response?.data?.message ||
        "Signup failed.";

      setError(message);

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-tr from-[#FAF8FF] via-[#f8fafc] to-[#FAF8FF]">
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center gap-12 px-6 py-12 lg:flex-row lg:justify-between">

        {/* Left Section */}
        <div className="w-full max-w-lg space-y-6">
          <Logo />

          <div className="space-y-4">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 lg:text-4xl">
              Optimize your workflow with precision.
            </h1>

            <p className="text-base leading-relaxed text-slate-500">
              Join teams building the future with
              TaskFlow productivity tools.
            </p>
          </div>
        </div>

        {/* Signup Card */}
        <div className="w-full max-w-[480px] rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

          <h2 className="text-2xl font-semibold text-slate-900">
            Create an account
          </h2>

          <p className="mb-4 text-sm text-slate-500">
            Enter your details to get started.
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
            className="space-y-4"
          >
            <Input
              id="name"
              type="text"
              placeholder="Name"
              icon={<User size={18} />}
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
            />

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
            />

            <PasswordInput
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              required
            />

            <PasswordInput
              id="confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) =>
                setConfirmPassword(
                  e.target.value
                )
              }
              required
            />

            <label className="flex items-start gap-2 text-sm">
              <input
                type="checkbox"
                required
                className="mt-1"
              />

              <span className="text-slate-500">
                I agree to the{" "}
                <span className="cursor-pointer font-medium text-[#0052cc] hover:underline">
                  Terms of Service
                </span>{" "}
                and{" "}
                <span className="cursor-pointer font-medium text-[#0052cc] hover:underline">
                  Privacy Policy
                </span>
                .
              </span>
            </label>

            <Button
              type="submit"
              loading={loading}
              loadingText="Creating Account..."
            >
              Create Account
            </Button>
          </form>

          {/* Social */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="mx-4 text-xs text-slate-400">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-3 text-sm font-medium hover:bg-slate-100">
              <FcGoogle size={20} />
              Google
            </button>

            <button className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-3 text-sm font-medium hover:bg-slate-100">
              <FaGithub size={18} />
              GitHub
            </button>
          </div>

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-blue-600 hover:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Signup;