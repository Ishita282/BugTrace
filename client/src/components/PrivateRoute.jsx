import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const guestId = localStorage.getItem("guestId");

  if (token || guestId) {
    return children;
  }

  return <Navigate to="/login" />;
};

export default PrivateRoute;