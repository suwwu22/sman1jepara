export default function BeritaSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-72 animate-pulse rounded-2xl bg-slate-100" />
      ))}
    </div>
  );
}
