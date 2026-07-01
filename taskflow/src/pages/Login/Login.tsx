import { useState } from "react";
import { Mail } from "lucide-react";

import {Button, Input, PasswordInput, Logo} from "../../components";

function Login() {
  // React State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  console.log("Email:", email);
  console.log("Password:", password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f3f6ff] via-[#f8fafc] to-[#f1f5f9]">
      {/* Centering Container */}
      <div className="flex min-h-screen flex-col items-center justify-center px-4">

        {/* Logo Section */}
        <Logo />

        {/* Login Card */}
        <div className="w-full max-w-[440px] rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit}>
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
          </form>

        </div>

      </div>
    </div>
  );
}

export default Login;