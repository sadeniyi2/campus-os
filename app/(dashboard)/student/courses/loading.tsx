export default function CoursesLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-32 rounded-lg" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-5 w-3/4 rounded mb-2" />
            <div className="skeleton h-3 w-1/2 rounded mb-4" />
            <div className="flex gap-2 mb-4">
              <div className="skeleton h-5 w-16 rounded-full" />
              <div className="skeleton h-5 w-20 rounded-full" />
            </div>
            <div className="skeleton h-1 w-full rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
