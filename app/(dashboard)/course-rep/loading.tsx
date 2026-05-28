export default function CourseRepLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-48 rounded-lg" />
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-10 w-10 rounded-lg mb-4" />
            <div className="skeleton h-5 w-40 rounded mb-2" />
            <div className="skeleton h-4 w-full rounded mb-1" />
            <div className="skeleton h-4 w-3/4 rounded mb-4" />
            <div className="skeleton h-10 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
