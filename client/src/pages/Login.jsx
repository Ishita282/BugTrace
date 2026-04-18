import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      return setError("All fields are required");
    }

    try {
      const res = await axios.post("http://localhost:4000/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);

      localStorage.removeItem("guestId");
      localStorage.setItem("mode", "user");

      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-4">Login</h2>

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
        onClick={handleLogin}
        className="bg-black text-white w-full py-2 rounded"
      >
        Login
      </button>

      <p className="text-sm mt-3 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-500">
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
