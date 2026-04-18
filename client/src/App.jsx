import { Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BugWorkspace from "./pages/BugWorkspace";
import PrivateRoute from "./components/PrivateRoute";
import BugShare from "./pages/BugShare";
import Footer from "./components/Footer";
import Contact from "./pages/Contact";
import ScrollToTop from "./utils/ScrollTo Top";

export default function App() {
  return (
    <>
      <ScrollToTop />

      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/contact" element={<Contact />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/bugs/:id"
          element={
            <PrivateRoute>
              <BugWorkspace />
            </PrivateRoute>
          }
        />

        <Route path="/bugs/share/:token" element={<BugShare />} />
      </Routes>

      <Footer />
    </>
  );
}
