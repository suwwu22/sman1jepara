export default function StatCard({ value, label }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-md">
      <p className="text-3xl font-bold text-blue-700 sm:text-4xl">{value}</p>
      <p className="mt-1 text-sm font-medium text-slate-600">{label}</p>
    </div>
  );
}
