import { PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="overflow-hidden bg-[#F8FAFF] pt-16">
      <div className="mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">

        {/* Badge */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-xs font-semibold text-[#0052CC]">
          <span>⚡</span>
          <span>New: Real-time Collaboration Released</span>
        </div>

        {/* Heading */}
        <h1 className="mb-6 text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
          Manage Projects.
          <br className="hidden sm:block" />
          Track Progress.
          <span className="text-[#0052CC]"> Deliver Faster.</span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mb-10 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">
          The high-performance productivity platform for teams who demand
          clarity. Built for speed, designed for focus, and engineered for
          execution.
        </p>

        {/* Buttons */}
        <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">

          <button
            onClick={() => navigate("/signup")}
            className="w-full rounded-md bg-[#0052CC] px-6 py-3 font-medium text-white shadow-md transition hover:bg-[#0043A4] sm:w-auto"
          >
            Get Started Free
          </button>

          <button
            className="flex w-full items-center justify-center gap-2 rounded-md bg-slate-200 px-6 py-3 font-medium text-slate-700 transition hover:bg-slate-300 sm:w-auto"
          >
            <PlayCircle size={20} />
            Watch Demo
          </button>

        </div>
      </div>

      {/* Dashboard Mockup */}
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-t-3xl bg-[#1E5D75] px-6 pt-10 shadow-2xl md:px-20">
          <div className="rounded-t-2xl border border-white/20 bg-[#F0F4F8] p-4 shadow-inner">
            <div className="flex aspect-[16/10] flex-col gap-4 rounded-xl bg-white p-5 shadow">

              {/* Top */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="h-3 w-3 rounded-full bg-sky-400" />
                  <div className="h-3 w-28 rounded bg-slate-200" />
                </div>
                <div className="h-3 w-16 rounded bg-slate-100" />
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="h-20 rounded-xl border border-sky-100 bg-sky-50"
                  />
                ))}
              </div>

              {/* Bottom */}
              <div className="grid flex-1 grid-cols-3 gap-4">

                {/* Analytics */}
                <div className="col-span-2 rounded-xl bg-slate-50 p-4">
                  <div className="flex h-full items-end justify-between gap-2">
                    {[30, 45, 60, 90, 50, 75].map((height) => (
                      <div
                        key={height}
                        className="w-full rounded-t bg-sky-500"
                        style={{
                          height: `${height}%`,
                        }}
                      />
                    ))}

                  </div>
                </div>

                {/* Activity */}
                <div className="rounded-xl bg-slate-50 p-4">
                  <div className="mb-3 h-3 w-3/4 rounded bg-slate-200" />
                  <div className="mb-2 h-3 w-1/2 rounded bg-slate-100" />
                  <div className="mb-2 h-3 w-5/6 rounded bg-slate-100" />
                  <div className="h-3 w-2/3 rounded bg-slate-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;