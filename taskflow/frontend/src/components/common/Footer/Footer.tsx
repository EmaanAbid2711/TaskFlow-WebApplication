function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white px-6 py-4">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-xs text-slate-500 sm:flex-row">
        <p>
          © {new Date().getFullYear()} TaskFlow Inc. All rights reserved.
        </p>

        <div className="flex gap-6">
          <button className="transition-colors hover:text-slate-700">
            Privacy Policy
          </button>

          <button className="transition-colors hover:text-slate-700">
            Terms of Service
          </button>

          <button className="transition-colors hover:text-slate-700">
            Status
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;