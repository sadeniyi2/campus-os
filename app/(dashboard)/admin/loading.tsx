export default function AdminDashboardLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-44 rounded-lg" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-4 w-28 rounded mb-2" />
            <div className="skeleton h-8 w-20 rounded" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
        <div className="p-6 border-b border-slate-200 dark:border-slate-800">
          <div className="skeleton h-5 w-40 rounded" />
        </div>
        <div className="p-4 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-2">
              <div className="skeleton h-9 w-9 rounded-full" />
              <div className="flex-1 space-y-1.5">
                <div className="skeleton h-4 w-1/3 rounded" />
                <div className="skeleton h-3 w-1/4 rounded" />
              </div>
              <div className="skeleton h-6 w-20 rounded-full" />
              <div className="skeleton h-8 w-20 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
