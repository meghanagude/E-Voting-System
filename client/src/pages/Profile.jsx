import { useAuth } from "../context/AuthContext";
import Layout from "../components/layout/Layout";

function Profile() {
  const { user } = useAuth();

  if (!user) {
    return (
      <Layout>
        <h2 className="text-2xl font-bold">
          User not found
        </h2>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          My Profile
        </h1>

        <div className="bg-white shadow-lg rounded-xl p-8">

          <div className="flex justify-center mb-8">
            <div className="w-28 h-28 rounded-full bg-blue-600 text-white flex items-center justify-center text-5xl font-bold">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>

          <div className="space-y-5">

            <div>
              <p className="text-gray-500">
                Name
              </p>

              <h2 className="text-xl font-semibold">
                {user.name}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Email
              </p>

              <h2 className="text-xl font-semibold">
                {user.email}
              </h2>
            </div>

            <div>
              <p className="text-gray-500">
                Role
              </p>

              <h2 className="text-xl font-semibold capitalize">
                {user.role}
              </h2>
            </div>

          </div>

        </div>
      </div>
    </Layout>
  );
}

export default Profile;