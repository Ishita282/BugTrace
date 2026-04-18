import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#0b0f17] border-t border-white/10 mt-24">

      <div className="max-w-6xl mx-auto px-6 py-14">

        {/* TOP: Brand Statement */}
        <div className="text-center mb-14">

          <h2 className="text-xl font-semibold text-white">
            Built for developers who hate unclear bug reports.
          </h2>

          <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm leading-relaxed">
            BugTrace replaces messy paragraphs with structured, reproducible bug timelines —
            so teams stop guessing and start fixing.
          </p>

        </div>

        {/* MID: Minimal navigation */}
        <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">

          <Link to="/" className="hover:text-white transition">Home</Link>
          <Link to="/dashboard" className="hover:text-white transition">Dashboard</Link>
          <Link to="/contact" className="hover:text-white transition">Support</Link>
          <Link to="/about" className="hover:text-white transition">About</Link>

        </div>

        {/* BOTTOM: identity bar */}
        <div className="mt-12 flex flex-col items-center gap-3">

          <div className="flex items-center gap-2 text-gray-500 text-xs">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Debugging clarity for modern teams
          </div>

          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} BugTrace — Precision over paragraphs.
          </p>

        </div>

      </div>
    </footer>
  );
};

export default Footer;