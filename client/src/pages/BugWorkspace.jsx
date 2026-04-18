import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getBug,
  getSteps,
  createStep,
  deleteStep,
  updateStep,
} from "../urlApi/api";

export default function BugWorkspace() {
  const { id } = useParams();

  const [bug, setBug] = useState(null);
  const [steps, setSteps] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);
  const [stepTitle, setStepTitle] = useState("");
  const [stepDesc, setStepDesc] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [playIndex, setPlayIndex] = useState(-1);
  const [isPlaying, setIsPlaying] = useState(false);

  // =========================
  // LOAD DATA
  // =========================
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [bugRes, stepsRes] = await Promise.all([
          getBug(id),
          getSteps(id),
        ]);

        setBug(bugRes.data);
        setSteps(stepsRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  // =========================
  // RESET INDEX ON STEP CHANGE
  // =========================
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [steps]);

  // =========================
  // REPLAY LOGIC (FIXED, SAME BEHAVIOR)
  // =========================
  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    setPlayIndex(-1);

    const interval = setInterval(() => {
      setPlayIndex((prev) => {
        if (prev >= steps.length - 1) {
          setIsPlaying(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying, steps]);

  useEffect(() => {
    if (playIndex >= 0) {
      setCurrentStepIndex(playIndex);
    }
  }, [playIndex]);

  // =========================
  // ADD STEP
  // =========================
  const handleAddStep = async () => {
    if (!stepTitle.trim()) return;

    try {
      const res = await createStep(id, {
        title: stepTitle,
        description: stepDesc,
        order: steps.length + 1,
      });

      setSteps(res.data);
      setStepTitle("");
      setStepDesc("");
      setShowForm(false);
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // DELETE STEP
  // =========================
  const handleDeleteStep = async (stepId) => {
    try {
      const res = await deleteStep(id, stepId);

      const updated = res.data;
      setSteps(updated);

      setCurrentStepIndex((prev) =>
        Math.max(0, Math.min(prev, updated.length - 1)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // UPDATE STEP
  // =========================
  const handleUpdateStep = async () => {
    const step = steps[currentStepIndex];
    if (!stepTitle.trim()) return;

    try {
      const res = await updateStep(id, step._id, {
        title: stepTitle,
        description: stepDesc,
      });

      const updatedSteps = [...steps];
      updatedSteps[currentStepIndex] = res.data;

      setSteps(updatedSteps);

      setIsEditing(false);
      setStepTitle("");
      setStepDesc("");
    } catch (err) {
      console.log(err);
    }
  };

  // =========================
  // SHARE BUG
  // =========================
  const shareBug = () => {
    const link = `${window.location.origin}/bug/share/${bug.shareToken}`;
    navigator.clipboard.writeText(link);
    alert("Share link copied!");
  };

  if (loading) return <p>Loading...</p>;
  if (!bug) return <p>Bug not found</p>;

  const progress =
    steps.length > 1 ? ((playIndex + 1) / steps.length) * 100 : 0;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* BUG HEADER */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">{bug.title}</h1>
        <p className="text-gray-600">{bug.description}</p>
      </div>

      {/* STEP BOARD */}
      <div className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-4">Steps</h2>

        {/* ACTION BUTTONS */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <button
            onClick={() => {
              setShowForm(!showForm);
              setIsEditing(false);
            }}
            className="bg-black text-white px-4 py-2 rounded"
          >
            + Add Step
          </button>

          <div className="flex items-center justify-between gap-3 mb-4">
            <button
            onClick={() => {
              if (steps.length === 0) return;
              setIsPlaying((p) => !p);
            }}
            className="bg-green-500 text-white px-3 py-2 rounded"
          >
            {isPlaying ? "Pause Replay" : "Replay Steps"}
          </button>
          <button className="bg-blue-500 text-white px-3 py-2 rounded" onClick={shareBug}>
            Share Bug
          </button>
          </div>
        </div>

        {/* STEP LIST */}
        {steps.length === 0 && (
          <p className="text-gray-500 mt-4">No steps yet</p>
        )}

        {/* PROGRESS BAR */}
        <div className="w-full bg-gray-200 h-2 rounded mb-6">
          <div
            className="bg-black h-2 rounded transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* TIMELINE */}
        <div className="flex items-center gap-2 mt-4 overflow-x-auto">
          {steps.map((step, index) => (
            <div key={step._id} className="flex items-center">
              <div
                onClick={() => {
                  setCurrentStepIndex(index);
                  setIsPlaying(false);
                }}
                className={`w-7 h-7 flex items-center justify-center rounded-full text-xs cursor-pointer transition-all duration-200 ${
                  index === currentStepIndex
                    ? "bg-black text-white scale-100"
                    : index < currentStepIndex
                      ? "bg-green-500 text-white"
                      : "bg-gray-300"
                }`}
              >
                {index + 1}
              </div>

              {index < steps.length - 1 && (
                <div className="w-10 h-1 bg-gray-300"></div>
              )}
            </div>
          ))}
        </div>

        {/* STEP DETAILS */}
        {currentStepIndex >= 0 && steps[currentStepIndex] && (
          <div className="bg-gray-50 p-4 rounded mt-4 border">
            <p className="text-sm text-gray-500 mb-2">
              Step {currentStepIndex + 1} of {steps.length}
            </p>

            <h3 className="font-semibold text-lg">
              {steps[currentStepIndex].title}
            </h3>

            <p className="text-gray-600">
              {steps[currentStepIndex].description}
            </p>

            <div className="flex gap-2 mt-4">
              <button
                disabled={currentStepIndex === 0}
                onClick={() =>
                  setCurrentStepIndex((prev) => Math.max(prev - 1, 0))
                }
                className="bg-gray-300 px-4 py-2 rounded disabled:opacity-50"
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
                className="bg-black text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>

              <button
                onClick={() => handleDeleteStep(steps[currentStepIndex]._id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>

              <button
                onClick={() => {
                  const step = steps[currentStepIndex];
                  setStepTitle(step.title);
                  setStepDesc(step.description);
                  setIsEditing(true);
                  setShowForm(false);
                }}
                className="bg-yellow-400 px-3 py-1 rounded"
              >
                Edit
              </button>
            </div>
          </div>
        )}

        {/* ADD FORM */}
        {showForm && (
          <div className="bg-white p-4 rounded shadow mt-4 border">
            <input
              autoFocus
              type="text"
              placeholder="Step title"
              value={stepTitle}
              onChange={(e) => setStepTitle(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <textarea
              placeholder="Step description"
              value={stepDesc}
              onChange={(e) => setStepDesc(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <button
              onClick={handleAddStep}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add Step
            </button>
          </div>
        )}

        {/* EDIT FORM */}
        {isEditing && (
          <div className="mt-2">
            <input
              autoFocus
              value={stepTitle}
              onChange={(e) => setStepTitle(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <textarea
              value={stepDesc}
              onChange={(e) => setStepDesc(e.target.value)}
              className="border p-2 w-full mb-2"
            />

            <button onClick={handleUpdateStep}>Save</button>
          </div>
        )}
      </div>
    </div>
  );
}
