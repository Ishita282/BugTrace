import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!email.trim() || !password.trim()) {
      return setError("All fields are required");
    }

    try {
      const guestId = localStorage.getItem("guestId");

      await axios.post(
        "http://localhost:4000/auth/register",
        {
          email,
          password,
        },
        {
          headers: {
            "x-guest-id": guestId,
          },
        },
      );

      localStorage.removeItem("guestId");
      localStorage.removeItem("mode");

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>

      <input
        type="email"
        placeholder="Email"
        className="border p-2 w-full mb-2"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border p-2 w-full mb-2"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

      <button
        onClick={handleRegister}
        className="bg-black text-white w-full py-2 rounded"
      >
        Register
      </button>

      <p className="text-sm mt-3 text-center">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500">
          Login
        </Link>
      </p>
    </div>
  );
};

export default Register;
