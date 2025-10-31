export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-slate-950 to-black px-4 py-10">
      <main className="mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur">
        <div className="flex flex-col md:flex-row">
          <section className="relative hidden min-h-[480px] flex-1 flex-col justify-between bg-[radial-gradient(circle_at_top,_#38bdf8_0%,_rgba(56,189,248,0)_70%)] p-10 text-white md:flex">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
                <span className="inline-block h-2 w-2 rounded-full bg-emerald-400" />
                Welcome back
              </p>
              <h1 className="mt-8 text-4xl font-semibold leading-tight sm:text-5xl">
                Sign in to unlock analytics insights
              </h1>
              <p className="mt-4 max-w-md text-sm text-white/80 sm:text-base">
                Access real-time dashboards, schedule automated reports, and
                collaborate with your team—all from one modern workspace.
              </p>
            </div>
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-base font-semibold text-white">
                  24/7
                </div>
                <div>
                  <p className="font-medium text-white">Always-on support</p>
                  <p>Get priority help whenever you need it.</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-base font-semibold text-white">
                  AI
                </div>
                <div>
                  <p className="font-medium text-white">Intelligent alerts</p>
                  <p>Let our AI notify you before trends slip away.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="flex w-full flex-1 flex-col justify-center bg-white px-6 py-12 text-slate-900 dark:bg-slate-900 dark:text-slate-100 sm:px-12 lg:px-16">
            <div className="mx-auto w-full max-w-md">
              <div className="mb-10 text-center md:text-left">
                <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                  Log in
                </h2>
                <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
                  New to Lstats?{" "}
                  <a
                    className="font-medium text-sky-500 hover:text-sky-400"
                    href="#"
                  >
                    Create an account
                  </a>
                </p>
              </div>

              <form className="space-y-6">
                <div className="space-y-2">
                  <label
                    className="text-sm font-medium text-slate-600 dark:text-slate-300"
                    htmlFor="email"
                  >
                    Email address
                  </label>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-400"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      className="text-sm font-medium text-slate-600 dark:text-slate-300"
                      htmlFor="password"
                    >
                      Password
                    </label>
                    <a
                      className="text-sm font-medium text-sky-500 hover:text-sky-400"
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <input
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition focus:border-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-200/60 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-400"
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <input
                      className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400 dark:border-slate-600 dark:bg-slate-800 dark:checked:bg-sky-500 dark:focus:ring-sky-400"
                      type="checkbox"
                      name="remember"
                    />
                    Remember me
                  </label>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    Secure by industry standards
                  </span>
                </div>

                <button
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-sky-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-400 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-slate-900"
                  type="submit"
                >
                  Sign in
                </button>
              </form>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
