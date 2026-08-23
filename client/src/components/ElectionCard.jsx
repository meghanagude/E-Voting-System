import { Link } from "react-router-dom";

function ElectionCard({ election, onDelete }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">

      <div className="flex justify-between">

        <div>
          <h2 className="text-2xl font-bold">
            {election.title}
          </h2>

          <p className="text-gray-600 mt-2">
            {election.description}
          </p>
        </div>

        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold h-fit">
          {election.status}
        </span>

      </div>

      <div className="mt-5 text-gray-600 space-y-2">

        <p>
          📅 {new Date(election.startDate).toLocaleDateString()}
        </p>

        <p>
          📅 {new Date(election.endDate).toLocaleDateString()}
        </p>

        <p>
          👤 {election.createdBy?.name}
        </p>

      </div>

      <div className="flex gap-4 mt-6">

  <Link to={`/edit-election/${election._id}`}>
    <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-2 rounded-lg">
      Edit
    </button>
  </Link>

  <button
    onClick={() => onDelete(election._id)}
    className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg"
  >
    Delete
  </button>

  <Link to={`/candidates/${election._id}`}>
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg">
      Candidates
    </button>
  </Link>

</div>

    </div>
  );
}

export default ElectionCard;