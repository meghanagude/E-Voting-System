import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LogoutButton() {
  const navigate = useNavigate();

  const { setUser } = useAuth();

  const logout = () => {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    setUser(null);

    navigate("/login");
  };

  return (
    <button onClick={logout}>
      Logout
    </button>
  );
}

export default LogoutButton;