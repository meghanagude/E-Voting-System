import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center px-4">
      <div className="bg-white shadow-xl rounded-2xl p-10 w-full max-w-xl">

        <div className="text-center">

          <div className="text-6xl mb-4">
            👤
          </div>

          <h1 className="text-3xl font-bold text-blue-700">
            User Profile
          </h1>

          <p className="text-gray-500 mt-2">
            Welcome back!
          </p>

        </div>

        {user ? (
          <div className="mt-8 space-y-4">

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Name
              </span>

              <span>{user.name}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Email
              </span>

              <span>{user.email}</span>
            </div>

            <div className="flex justify-between border-b pb-3">
              <span className="font-semibold">
                Role
              </span>

              <span className="capitalize">
                {user.role}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="font-semibold">
                Vote Status
              </span>

              <span
                className={
                  user.hasVoted
                    ? "text-green-600 font-semibold"
                    : "text-red-600 font-semibold"
                }
              >
                {user.hasVoted ? "Voted" : "Not Voted"}
              </span>
            </div>

          </div>
        ) : (
          <h2 className="text-center mt-8">
            No user logged in.
          </h2>
        )}

      </div>
    </div>
  );
}

export default Dashboard;