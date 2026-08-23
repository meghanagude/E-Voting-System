function StatCard({ title, value, color }) {
  return (
    <div
      className={`rounded-xl shadow-lg p-6 text-white ${color}`}
    >
      <h3 className="text-lg opacity-90">
        {title}
      </h3>

      <h1 className="text-4xl font-bold mt-4">
        {value}
      </h1>
    </div>
  );
}

export default StatCard;