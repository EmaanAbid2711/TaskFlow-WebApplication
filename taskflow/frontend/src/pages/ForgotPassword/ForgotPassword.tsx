import { useState } from "react";
import { Mail } from "lucide-react";
import { Link } from "react-router-dom";

import {Button, Footer, Input, Logo} from "../../components";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = (
    event: React.SubmitEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    console.log(email);
  };

  return (
    <div className="flex min-h-screen flex-col justify-between bg-gradient-to-tr from-[#FAF8FF] via-[#f8fafc] to-[#FAF8FF]">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Logo />

        <div className="w-full max-w-md w-[440] h-[367] rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

          <div className="mb-6 text-center">
            <h2 className="mb-2 text-2xl font-semibold text-slate-900">
              Forgot Password?
            </h2>
            <p className="text-sm text-slate-500">
              No worries, we'll send you reset instructions.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
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
                icon={<Mail size={18} />}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <Button type="submit">
              Send Reset Link
            </Button>
          </form>

          <div className="my-6 border-t border-slate-200" />

          <div className="text-center">
            <Link
              to="/"
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