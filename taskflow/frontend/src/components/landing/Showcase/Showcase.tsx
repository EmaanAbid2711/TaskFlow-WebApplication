function Showcase() {
  return (
    <section className="border-y border-slate-200 bg-slate-100 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <div className="rounded-2xl border border-white bg-white p-6 shadow-xl">

          {/* Window Header */}
          <div className="mb-6 flex items-center border-b border-slate-100 pb-4">
            <div className="flex gap-2">
              <div className="h-3 w-3 rounded-full bg-red-400" />
              <div className="h-3 w-3 rounded-full bg-yellow-400" />
              <div className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <div className="ml-5 h-3 w-36 rounded bg-slate-100" />
          </div>

          {/* Dashboard Content */}
          <div className="grid gap-8 md:grid-cols-2">

            {/* Left Side */}
            <div>
              <div className="mb-6 h-4 w-40 rounded bg-slate-200" />
              <div className="mb-8 flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-sky-100" />
                <div className="h-3 flex-1 rounded bg-slate-100" />
              </div>

              {/* Chart */}
              <div className="flex h-40 items-end gap-2 border-b border-l border-slate-200 px-2 pb-2">
                <div className="w-full rounded-t bg-sky-500" style={{ height: "40%" }} />
                <div className="w-full rounded-t bg-sky-500" style={{ height: "80%" }} />
                <div className="w-full rounded-t bg-sky-500" style={{ height: "65%" }} />
                <div className="w-full rounded-t bg-sky-500" style={{ height: "50%" }} />
                <div className="w-full rounded-t bg-sky-600" style={{ height: "95%" }} />
                <div className="w-full rounded-t bg-sky-400" style={{ height: "35%" }} />
                <div className="w-full rounded-t bg-sky-500" style={{ height: "70%" }} />
              </div>
            </div>

            {/* Right Side */}
            <div>
              <div className="mb-6 h-4 w-28 rounded bg-slate-200" />
              <div className="mb-8 flex items-center gap-3">
                <div className="h-6 w-14 rounded-full bg-sky-500" />
                <div className="h-6 w-14 rounded-full bg-slate-200" />
              </div>

              {/* Mini Chart */}
              <div className="flex h-40 items-end gap-4 border-b border-l border-slate-200 px-4 pb-2">

                <div
                  className="w-1/3 rounded-t bg-sky-400"
                  style={{ height: "20%" }}
                />

                <div
                  className="w-1/3 rounded-t bg-sky-500"
                  style={{ height: "70%" }}
                />

                <div
                  className="w-1/3 rounded-t bg-sky-400"
                  style={{ height: "45%" }}
                />

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Showcase;