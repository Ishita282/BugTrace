import { useState } from "react";
import { sendContact } from "../urlApi/api";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
    type: "help",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await sendContact(form);

      setForm({ name: "", email: "", message: "", type: "help" });
      alert("Request sent successfully 🚀");
    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    }

    setLoading(false);
  };

  const getPlaceholder = () => {
    if (form.type === "bug")
      return "Describe the bug with steps to reproduce...";
    if (form.type === "feature") return "Describe your idea or improvement...";
    return "What do you need help with?";
  };
  return (
    <div className="min-h-screen bg-[#0b0f17] text-white px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* HEADER */}
        <div className="text-center mb-14">
          <h1 className="text-3xl font-semibold">Need help with BugTrace?</h1>

          <p className="text-gray-400 mt-3">
            Whether you're stuck, found a bug, or have an idea — send it here.
          </p>
        </div>

        {/* SUPPORT OPTIONS (instead of boring form-first UX) */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-medium mb-2">💬 Quick Help</h3>
            <p className="text-sm text-gray-400">
              Small issue? Expect fast response within hours.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-medium mb-2">🐞 Bug Reports</h3>
            <p className="text-sm text-gray-400">
              Found a platform bug? Include reproduction steps.
            </p>
          </div>

          <div className="p-5 rounded-xl border border-white/10 bg-white/5">
            <h3 className="font-medium mb-2">⚙️ Feature Requests</h3>
            <p className="text-sm text-gray-400">
              Help shape BugTrace with your workflow ideas.
            </p>
          </div>
        </div>

        {/* TYPE SELECTION */}
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="w-full p-3 bg-[#0b0f17] border border-white/10 rounded-md text-white outline-none"
        >
          <option value="help">💬 I need help</option>
          <option value="bug">🐞 Report a bug</option>
          <option value="feature">⚙️ Suggest a feature</option>
        </select>

        {/* SPACING */}
        <div className="h-6"></div>

        {/* FORM SECTION (SECONDARY NOW — IMPORTANT UX SHIFT) */}
        <div className="bg-[#111827] border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-medium mb-4">Send a message</h2>

          <div className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className="w-full p-3 bg-[#0b0f17] border border-white/10 rounded-md text-white outline-none"
              />

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full p-3 bg-[#0b0f17] border border-white/10 rounded-md text-white outline-none"
              />

              <textarea
                rows="5"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder={getPlaceholder()}
                className="w-full p-3 bg-[#0b0f17] border border-white/10 rounded-md text-white outline-none"
              />

              <button
                disabled={loading}
                className="bg-red-500 hover:bg-red-600 transition px-5 py-2 rounded-md font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading
                  ? "Sending..."
                  : form.type === "bug"
                    ? "Report Bug"
                    : form.type === "feature"
                      ? "Submit Idea"
                      : "Get Help"}
              </button>
            </form>
          </div>
        </div>

        {/* FOOTNOTE */}
        <p className="text-center text-xs text-gray-500 mt-10">
          We respond faster when bugs include steps to reproduce.
        </p>
      </div>
    </div>
  );
};

export default Contact;
