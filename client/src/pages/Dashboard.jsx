import React, { useEffect, useState } from "react";
import { getAllBugs, createBug } from "../urlApi/api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [bugs, setBugs] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const mode = localStorage.getItem("mode");

  useEffect(() => {
    let isMounted = true;

    const fetchBugs = async () => {
      const token = localStorage.getItem("token");
      const guestId = localStorage.getItem("guestId");

      if (!token && !guestId) {
        console.log("No auth, redirecting...");
        navigate("/");
        return;
      }
      try {
        const res = await getAllBugs();
        if (isMounted) setBugs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBugs();

    return () => {
      isMounted = false;
    };
  }, [navigate]);

  const handleCreateBug = async () => {
    if (!title.trim()) return setError("Title is required");
    if (!description.trim()) return setError("Description is required");

    try {
      const res = await createBug({ title, description });

      setBugs((prev) => [res.data, ...prev]);

      setTitle("");
      setDescription("");
      setShowForm(false);
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <p className="text-gray-500">Loading bugs...</p>;

  return (
    <div className="p-4">
      {mode === "guest" && (
        <p className="text-yellow-600 text-sm mb-3">
          ⚠ You are in Guest Mode — data will be deleted after 24 hours
        </p>
      )}

      <button
        onClick={() => {
          setShowForm(!showForm);
          setTitle("");
          setDescription("");
          setError("");
        }}
        className="bg-black text-white px-4 py-2 rounded"
      >
        {showForm ? "Cancel" : "+ Create Bug"}
      </button>

      {showForm ? (
        <div className="bg-white p-4 rounded shadow mb-4">
          <input
            autoFocus
            type="text"
            placeholder="Bug title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <textarea
            placeholder="Bug description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-2"
          />

          <button
            onClick={handleCreateBug}
            disabled={!title.trim()}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            Create
          </button>

          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        </div>
      ) : (
        <div className="mt-4 grid gap-3">
          {bugs.length === 0 && <p>No bugs yet</p>}
          {bugs.map((bug) => (
            <div
              key={bug._id}
              onClick={() => navigate(`/bug/${bug._id}`)}
              className="border p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer"
            >
              <p className="text-sm text-gray-500">ID: {bug._id}</p>
              <h3 className="font-semibold text-lg">Title: {bug.title}</h3>
              <p className="text-gray-600">Description: {bug.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
