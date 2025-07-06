import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const Protected = ({ children, authen = true }) => {
  const authStatus = useSelector((state) => state.auth.status);

  // If authentication is required but user not logged in
  if (authen && !authStatus) {
    return <Navigate to="/login" replace />;
  }

  // If authentication is NOT required but user is already logged in
  if (!authen && authStatus) {
    return <Navigate to="/" replace />;
  }

  // Access allowed
  return <>{children}</>;
};
