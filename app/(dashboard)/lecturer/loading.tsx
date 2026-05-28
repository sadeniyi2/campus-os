export default function LecturerDashboardLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-52 rounded-lg" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-4 w-24 rounded mb-2" />
            <div className="skeleton h-8 w-16 rounded" />
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-5 w-32 rounded mb-4" />
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, j) => (
                <div key={j} className="skeleton h-4 w-full rounded" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
