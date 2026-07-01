import { useState } from "react";
import { Mail, ShieldCheck } from "lucide-react";

import {Button, Input, PasswordInput} from "../../components";

function Login() {
  // React State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f3f6ff] via-[#f8fafc] to-[#f1f5f9]">
      {/* Centering Container */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4">

        {/* Logo Section */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#0052cc] text-white shadow-sm">
            <ShieldCheck size={24} />
          </div>

          <h1 className="mb-2 text-3xl font-bold tracking-tight text-slate-900">
            TaskFlow
          </h1>

          <p className="text-sm text-slate-500">
            Precision engineering for high-performance teams.
          </p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">

          <Input
            label="Email Address"
            id="email"
            type="email"
            placeholder="name@company.com"
            icon={<Mail size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <PasswordInput
            label="Password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <Button type="submit">
            Login to Dashboard
          </Button>

        </div>

      </div>
    </div>
  );
}

export default Login;