import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Home() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white py-24">
        <div className="max-w-6xl mx-auto px-8 text-center">

          <h1 className="text-6xl font-bold mb-6">
            Secure E-Voting System
          </h1>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            A secure, transparent and efficient online voting platform
            developed using the MERN Stack with JWT Authentication,
            Role-Based Access Control and Real-Time Election Management.
          </p>

          <div className="mt-10 flex justify-center gap-6">

            {!user ? (
              <>
                <Link to="/login">
                  <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl hover:bg-gray-100">
                    Login
                  </button>
                </Link>

                <Link to="/register">
                  <button className="border border-white px-8 py-4 rounded-xl hover:bg-white hover:text-blue-700 transition">
                    Register
                  </button>
                </Link>
              </>
            ) : user.role === "admin" ? (
              <Link to="/admin">
                <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl">
                  Go to Admin Dashboard
                </button>
              </Link>
            ) : (
              <Link to="/dashboard">
                <button className="bg-white text-blue-700 font-semibold px-8 py-4 rounded-xl">
                  Go to Voter Dashboard
                </button>
              </Link>
            )}

          </div>

        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto py-20 px-8">

        <h2 className="text-4xl font-bold text-center mb-12">
          Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-5xl mb-5">🔒</div>
            <h3 className="text-2xl font-bold mb-3">
              Secure Authentication
            </h3>

            <p className="text-gray-600">
              JWT-based authentication ensures that only authorized
              users can access the system.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-5xl mb-5">🗳</div>

            <h3 className="text-2xl font-bold mb-3">
              One Person, One Vote
            </h3>

            <p className="text-gray-600">
              Every voter can vote only once in an election,
              preventing duplicate voting.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="text-5xl mb-5">📊</div>

            <h3 className="text-2xl font-bold mb-3">
              Live Results
            </h3>

            <p className="text-gray-600">
              Election results are automatically calculated and
              displayed after voting.
            </p>
          </div>

        </div>

      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center">
        <p>
          © 2026 Secure E-Voting System | Built with React, Node.js,
          Express & MongoDB
        </p>
      </footer>

    </div>
  );
}

export default Home;