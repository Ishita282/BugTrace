import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getSharedBug } from "../urlApi/api";

export default function BugShare() {
  const { token } = useParams();

  const [bug, setBug] = useState(null);
  const [steps, setSteps] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  // ================= FETCH =================
  useEffect(() => {
    if (!token) return;

    const fetchBug = async () => {
      try {
        setLoading(true);

        const res = await getSharedBug(token);
        const data = res.data;

        setBug(data);
        setSteps(data?.steps || []);
        setCurrentStepIndex(0);
        setIsPlaying(false);
        setError(null);
      } catch (err) {
        console.error(err);
        setError("Invalid or expired share link");
        setBug(null);
        setSteps([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBug();
  }, [token]);

  // =========================
  // RESET INDEX ON STEP CHANGE
  // =========================
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [steps]);

 

  // ================= PLAYBACK =================
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1200);

    return () => clearInterval(interval);
  }, [isPlaying, steps.length]);

  // ================= STATES =================
  if (loading) return <p className="p-6 text-white">Loading replay...</p>;
  if (error) return <p className="p-6 text-red-400">{error}</p>;
  if (!bug) return <p className="p-6 text-white">No bug found</p>;

  // ================= FIXED PROGRESS (SMOOTH + SAFE) =================
  const progress =
    steps.length > 1 ? (currentStepIndex / (steps.length - 1)) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 text-black px-6 py-10">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">
            {bug?.title || "Untitled Bug"}
          </h1>

          <p className="text-gray-500 mt-2 text-sm leading-relaxed">
            {bug?.description || "No description"}
          </p>

          <div className="inline-flex mt-4 px-3 py-1 text-xs rounded-full bg-yellow-100 text-yellow-700 border border-yellow-200 shadow-sm">
            Shared Bug Replay (View Only)
          </div>
        </div>

        {/* MAIN CARD */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-md p-6">
          {/* CONTROLS */}
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => setIsPlaying(true)}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:opacity-90 active:scale-95 transition"
            >
              Play
            </button>

            <button
              onClick={() => {
                setIsPlaying((prev) => !prev);
              }}
              className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:opacity-90 active:scale-95 transition"
            >
              {isPlaying ? "Pause Step" : "Resume Step"}
            </button>

            <button
              onClick={() => {
                setCurrentStepIndex(0);
                setIsPlaying(false);
              }}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm shadow-sm hover:opacity-90 active:scale-95 transition"
            >
              Reset
            </button>
          </div>

          {/* PROGRESS BAR */}
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6 shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-black via-gray-800 to-black transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          {/* TIMELINE */}
          <div className="flex items-center gap-3 overflow-x-auto pb-3 mb-6 scrollbar-hide">
            {steps.map((step, index) => (
              <div key={step._id} className="flex items-center">
                <div
                  onClick={() => {
                    setCurrentStepIndex(index);
                    setIsPlaying(false);
                  }}
                  className={`w-10 h-10 flex items-center justify-center rounded-full text-xs font-semibold cursor-pointer transition-all duration-200 shadow-sm
                  ${
                    index === currentStepIndex
                      ? "bg-black text-white scale-100 shadow-md"
                      : index < currentStepIndex
                        ? "bg-green-500 text-white"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }
                `}
                >
                  {index + 1}
                </div>

                {index < steps.length - 1 && (
                  <div className="w-10 h-[2px] bg-gray-300 mx-1 rounded-full" />
                )}
              </div>
            ))}
          </div>

          {/* STEP DETAILS */}
          {steps[currentStepIndex] && (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 shadow-sm">
              <p className="text-xs text-gray-500 mb-2">
                Step {currentStepIndex + 1} of {steps.length}
              </p>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {steps[currentStepIndex].title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {steps[currentStepIndex].description}
              </p>

              <div className="flex gap-2 mt-5">
                <button
                  disabled={currentStepIndex === 0}
                  onClick={() =>
                    setCurrentStepIndex((prev) => Math.max(prev - 1, 0))
                  }
                  className="px-4 py-2 rounded-lg bg-gray-200 text-sm disabled:opacity-40 hover:bg-gray-300 transition"
                >
                  Previous
                </button>

                <button
                  disabled={currentStepIndex === steps.length - 1}
                  onClick={() =>
                    setCurrentStepIndex((prev) =>
                      Math.min(prev + 1, steps.length - 1),
                    )
                  }
                  className="px-4 py-2 rounded-lg bg-black text-white text-sm disabled:opacity-40 hover:opacity-90 transition"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* FOOTER */}
          <p className="text-xs text-gray-400 mt-6 text-center">
            Bug replay is read-only and shared for debugging / QA review.
          </p>
        </div>
      </div>
    </div>
  );
}
