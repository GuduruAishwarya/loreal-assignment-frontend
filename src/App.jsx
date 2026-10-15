import { useState } from "react";

const API_URL = import.meta.env.VITE_BACKEND_API_URL || "http://localhost:3001";

const initialForm = {
  productName: "Radiant Glow Serum",
  claimText: "Reduces wrinkles by 20% in 8 weeks.",
  evidenceText:
    "A 12-week clinical study on 120 participants reported a 18% improvement in wrinkle depth compared with baseline and no statistically significant results for the 20% threshold.",
  studyType: "Clinical Trial",
};

function App() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch(`${API_URL}/claims/assess`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "Assessment failed");
      }

      setResult(data);
    } catch (err) {
      setError(
        err.message || "Something went wrong while assessing the claim.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="mb-8 flex items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.28em] text-violet-400">
              Claims Intelligence
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-4xl">
              Beauty claim assessment
            </h1>
          </div>
          <div className="rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
            Gemini AI
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-2xl shadow-violet-950/20"
          >
            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Product
              </label>
              <input
                name="productName"
                value={form.productName}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Claim
              </label>
              <textarea
                name="claimText"
                value={form.claimText}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
              />
            </div>

            <div className="mb-5">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Evidence
              </label>
              <textarea
                name="evidenceText"
                value={form.evidenceText}
                onChange={handleChange}
                rows={6}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
              />
            </div>

            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-200">
                Study type
              </label>
              <input
                name="studyType"
                value={form.studyType}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-violet-600 px-5 py-3 font-semibold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Assessing claim..." : "Assess claim"}
            </button>

            {error && (
              <div className="mt-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-200">
                {error}
              </div>
            )}
          </form>

          <aside className="rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/30">
            <h2 className="mb-4 text-xl font-semibold text-slate-100">
              Assessment result
            </h2>

            {!result && !error && (
              <div className="rounded-xl border border-dashed border-slate-700 bg-slate-950/50 p-6 text-sm text-slate-400">
                Submit a claim to see the AI-backed assessment.
              </div>
            )}

            {result && (
              <div className="space-y-4">
                <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Decision
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                        result.justified
                          ? "bg-emerald-500/15 text-emerald-300"
                          : "bg-red-500/15 text-red-300"
                      }`}
                    >
                      {result.justified ? "Justified" : "Not justified"}
                    </span>
                  </div>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Confidence
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {result.confidenceScore}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-700 bg-slate-950/60 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-400">
                    Reasoning
                  </p>
                  <p className="mt-2 text-sm leading-6 text-slate-200">
                    {result.reasoning}
                  </p>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
