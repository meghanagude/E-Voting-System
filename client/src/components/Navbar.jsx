import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-8 py-4">

        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide"
        >
          🗳 E-Voting System
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6 text-lg">

          <Link
            to="/"
            className="hover:text-blue-200 transition"
          >
            Home
          </Link>

          {!user ? (
            <>
              <Link
                to="/login"
                className="hover:text-blue-200 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="hover:text-blue-200 transition"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              {/* Show only one dashboard based on role */}
              {user.role === "admin" ? (
                <Link
                  to="/admin"
                  className="hover:text-blue-200 transition"
                >
                  Admin Dashboard
                </Link>
              ) : (
                <Link
                  to="/dashboard"
                  className="hover:text-blue-200 transition"
                >
                  Voter Dashboard
                </Link>
              )}

              {/* Logged in user */}
              <span className="font-semibold">
                👋 {user.name}
              </span>
              <Link
  to="/profile"
  className="hover:text-blue-200 transition"
>
  Profile
</Link>
              {/* Logout */}
              <button
                onClick={logoutHandler}
                className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg"
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;