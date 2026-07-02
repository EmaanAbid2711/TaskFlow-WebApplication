import { useState } from "react";
import { Mail, User } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";

import { Button, Footer, Input, Logo, PasswordInput } from "../../components";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    console.log({
      name,
      email,
      password,
      confirmPassword,
    });

    // ✅ Redirect to Dashboard after signup
    navigate("/dashboard");
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
              Join teams building the future with TaskFlow productivity tools.
            </p>
          </div>

          <ul className="space-y-3">
            <li className="flex items-center gap-3 text-sm text-slate-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                ✓
              </span>
              Real-time collaborative planning
            </li>

            <li className="flex items-center gap-3 text-sm text-slate-600">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-100 text-xs text-blue-600">
                ✓
              </span>
              Enterprise grade security
            </li>
          </ul>
        </div>

        {/* Signup Card */}
        <div className="w-full max-w-[480px] h-[780px] rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">

          <div className="mb-6">
            <h2 className="text-2xl font-semibold text-slate-900">
              Create an account
            </h2>
            <p className="text-sm text-slate-500">
              Enter your details to get started.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>

              <Input
                id="name"
                type="text"
                placeholder="Name"
                icon={<User size={18} />}
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>

              <Input
                id="email"
                type="email"
                placeholder="name@company.com"
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <PasswordInput
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Confirm Password */}
            <PasswordInput
              id="confirm-password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            {/* Terms */}
            <label className="flex cursor-pointer items-start gap-2 text-sm">
              <input type="checkbox" required className="mt-1" />

              <span className="text-slate-500">
                I agree to the{" "}
                <button type="button" className="font-medium text-[#0052cc] hover:underline">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button type="button" className="font-medium text-[#0052cc] hover:underline">
                  Privacy Policy
                </button>.
              </span>
            </label>

            {/* Submit */}
            <Button type="submit">
              Create Account
            </Button>

          </form>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="mx-4 text-xs text-slate-400">
              OR CONTINUE WITH
            </span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Social */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-3 text-sm font-medium transition-colors hover:bg-slate-100"
            >
              <FcGoogle size={20} />
              Google
            </button>

            <button
              type="button"
              className="flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-slate-50 py-3 text-sm font-medium transition-colors hover:bg-slate-100"
            >
              <FaGithub size={18} />
              GitHub
            </button>
          </div>

          {/* Login link */}
          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/" className="font-medium text-blue-600 hover:underline">
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