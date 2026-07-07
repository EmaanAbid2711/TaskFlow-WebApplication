import { Link } from "react-router-dom";

import LandingLogo from "../Logo/LandingLogo";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 px-6 py-10 md:flex-row">
        {/* Logo & Copyright */}
        <div className="flex flex-col items-center gap-3 md:items-start">
          <LandingLogo />

          <p className="text-center text-sm text-slate-500 md:text-left">
            © {new Date().getFullYear()} TaskFlow. All rights reserved.
          </p>
        </div>

        {/* Footer Links */}
        <nav className="flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-500">
          <button
            
            className="transition hover:text-[#0052CC]"
          >
            Privacy Policy
          </button>

          <button
            
            className="transition hover:text-[#0052CC]"
          >
            Terms of Service
          </button>

          <button
            
            className="transition hover:text-[#0052CC]"
          >
            Security
          </button>

          <button
            
            className="transition hover:text-[#0052CC]"
          >
            Status
          </button>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;