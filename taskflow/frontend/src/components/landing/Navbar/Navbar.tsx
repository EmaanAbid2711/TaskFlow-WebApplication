import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

import Logo from "../Logo/LandingLogo";

function Navbar() {
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    {
      label: "Features",
      href: "#features",
    },
    {
      label: "Pricing",
      href: "#pricing",
    },
    {
      label: "FAQ",
      href: "#faq",
    },
  ];

  const handleNavigate = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  const handleScroll = (id: string) => {
    setMobileMenuOpen(false);

    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[90%] items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex items-center gap-10">
          <Logo />
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className="text-sm font-medium text-slate-600 transition hover:text-[#0052CC]"
              >
                {link.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Desktop Buttons */}
        <div className="hidden items-center gap-4 lg:flex">

          <button
            onClick={() => handleNavigate("/login")}
            className="text-sm font-medium text-slate-700 transition hover:text-[#0052CC]"
          >
            Login
          </button>

          <button
            onClick={() => handleNavigate("/signup")}
            className="rounded-md bg-[#0052CC] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#0043A4]"
          >
            Get Started
          </button>

        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X size={24} />
          ) : (
            <Menu size={24} />
          )}
        </button>

      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white lg:hidden">
          <div className="space-y-1 p-4">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleScroll(link.href)}
                className="block w-full rounded-lg px-4 py-3 text-left text-sm font-medium text-slate-700 hover:bg-slate-100"
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => handleNavigate("/login")}
              className="mt-3 block w-full rounded-lg border border-slate-200 px-4 py-3 text-left text-sm font-medium hover:bg-slate-100"
            >
              Login
            </button>

            <button
              onClick={() => handleNavigate("/signup")}
              className="block w-full rounded-lg bg-[#0052CC] px-4 py-3 text-left text-sm font-medium text-white hover:bg-[#0043A4]"
            >
              Get Started
            </button>

          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;