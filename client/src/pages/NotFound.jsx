import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 px-6">

      <h1 className="text-8xl font-bold text-blue-700">
        404
      </h1>

      <h2 className="text-4xl font-bold mt-4">
        Page Not Found
      </h2>

      <p className="text-gray-600 mt-4 text-center max-w-lg">
        The page you are looking for doesn't exist or may have been moved.
      </p>

      <Link to="/">
        <button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl">
          Go to Home
        </button>
      </Link>

    </div>
  );
}

export default NotFound;