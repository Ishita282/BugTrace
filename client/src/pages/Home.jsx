import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleGuestMode = () => {
    let guestId = localStorage.getItem("guestId");

    if (!guestId) {
      guestId = "guest_" + Date.now();
      localStorage.setItem("guestId", guestId);
    }
    localStorage.setItem("mode", "guest");

    setTimeout(() => {
      navigate("/dashboard");
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#0b0f17] text-white">
      {/* HERO */}
      <div className="max-w-5xl mx-auto px-6 py-24 text-center">
        <div className="inline-block px-3 py-1 mb-6 text-xs bg-white/10 rounded-full border border-white/10">
          Built for Developers • QA Engineers • Indie Builders
        </div>

        <h1 className="text-5xl font-bold mb-4 tracking-tight">Bug Trace</h1>

        <p className="text-xl text-gray-300 mb-4">
          Track bugs with precision, not paragraphs.
        </p>

        <p className="text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Bug Trace is a structured bug reporting system designed to eliminate
          confusion between QA and developers. Instead of long unclear
          descriptions, every bug is broken into precise, reproducible steps —
          making debugging faster, cleaner, and more reliable.
        </p>

        <div className="flex gap-4 justify-center">
          {/* Primary CTA */}
          <Link to="/login">
            <button className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition transition-all duration-200">
              Login to Dashboard
            </button>
          </Link>

          {/* Secondary CTA */}
          <button
            onClick={handleGuestMode}
            className="border border-white/20 px-6 py-2 rounded-lg hover:bg-white/10 transition"
          >
            Create Bug (Guest/Quick Mode)
          </button>
        </div>
      </div>

      {/* PROBLEM */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-10 text-center">
          Why bug tracking breaks in real projects
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-semibold mb-2">❌ Ambiguous Bug Reports</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Most bugs are written in paragraphs that miss key reproduction
              details. Developers are forced to interpret instead of directly
              reproducing issues.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-semibold mb-2">❌ Slow Debugging Cycles</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              When steps are unclear, developers spend more time asking
              questions than fixing actual problems. This slows down release
              cycles and increases frustration.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-semibold mb-2">
              ❌ Inconsistent Reporting Style
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Every QA or developer writes bugs differently, making it hard to
              standardize workflows across teams or projects.
            </p>
          </div>
        </div>
      </div>

      {/* SOLUTION */}
      <div className="max-w-5xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-4">
          A structured system for reproducible bugs
        </h2>

        <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
          Bug Trace replaces free-form bug reports with a structured step-based
          model. Every bug becomes a clear sequence of actions that anyone can
          follow and reproduce instantly.
        </p>

        <div className="grid md:grid-cols-3 gap-6 text-left">
          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-medium mb-2">Step-Based Reporting</h3>
            <p className="text-gray-400 text-sm">
              Break every bug into atomic actions instead of long paragraphs.
              Each step is clear, traceable, and easy to validate.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-medium mb-2">Timeline-Based Visualization</h3>
            <p className="text-gray-400 text-sm">
              View bug reproduction as a sequence of events, helping developers
              instantly understand how the issue unfolds.
            </p>
          </div>

          <div className="p-6 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-medium mb-2">Standardized Debugging Flow</h3>
            <p className="text-gray-400 text-sm">
              Every bug follows the same structure — making collaboration
              between QA and developers seamless and predictable.
            </p>
          </div>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-12 text-center">
          Simple workflow. Powerful clarity.
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div>
            <div className="text-5xl font-bold text-white/10 mb-3">01</div>
            <h3 className="font-medium mb-2">Login</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Access your workspace where all bug reports are organized and
              tracked in one place.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-white/10 mb-3">02</div>
            <h3 className="font-medium mb-2">Create Structured Bug</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Add a clear title and short description that defines the issue
              without unnecessary noise.
            </p>
          </div>

          <div>
            <div className="text-5xl font-bold text-white/10 mb-3">03</div>
            <h3 className="font-medium mb-2">Build Repro Steps</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Add step-by-step reproduction flow so anyone can recreate the bug
              exactly as it happened.
            </p>
          </div>
        </div>
      </div>

      {/* FINAL CTA */}
      <div className="max-w-5xl mx-auto px-6 py-20 text-center">
        <div className="border border-white/10 bg-white/5 rounded-xl p-12">
          <h2 className="text-2xl font-semibold mb-3">
            Stop guessing bugs. Start reproducing them.
          </h2>

          <p className="text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Bug Trace brings structure to debugging workflows so teams can focus
            on fixing issues instead of understanding them. Built for speed,
            clarity, and developer efficiency.
          </p>

          <button
            onClick={() => {
              const token = localStorage.getItem("token");
              const guestId = localStorage.getItem("guestId");

              if (token || guestId) {
                navigate("/dashboard");
              } else {
                navigate("/login");
              }
            }}
            className="bg-white text-black px-6 py-2 rounded-lg font-medium hover:opacity-90 transition"
          >
            Open Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
