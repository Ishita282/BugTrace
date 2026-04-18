import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/logo.png";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="w-full border-b border-white/10 bg-[#111827] sticky top-0 z-50">
      {/* accent strip */}
      <div className="h-1 bg-red-500" />

      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        {/* LOGO */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => navigate("/")}
        >
          <img
            src={Logo}
            alt="BugTrace Logo"
            className="h-8 w-8 object-contain drop-shadow-[0_0_8px_rgba(239,68,68,0.4)]"
          />

          <h1 className="text-lg font-semibold tracking-tight">
            <span className="text-red-400 group-hover:text-red-300 transition">
              Bug
            </span>
            Trace
          </h1>
        </div>

        {/* LINKS */}
        <div className="flex items-center gap-6 text-sm text-gray-300">
          <Link
            to="/"
            className={`hover:text-white transition ${
              location.pathname === "/" ? "text-white" : ""
            }`}
          >
            About
          </Link>

          <Link
            to="/contact"
            className={`hover:text-white transition ${
              location.pathname === "/contact" ? "text-white" : ""
            }`}
          >
            Contact
          </Link>

          {!token ? (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-3 py-1 rounded-md border border-white/20 text-sm hover:bg-white/10 transition"
              >
                Register
              </Link>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm text-gray-300 hover:text-white transition"
              >
                Dashboard
              </button>

              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-md bg-red-500 text-white text-sm hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
