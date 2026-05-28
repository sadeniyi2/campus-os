export default function AttendanceLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-40 rounded-lg" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-4 w-20 rounded mb-2" />
            <div className="skeleton h-7 w-12 rounded" />
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="skeleton h-5 w-36 rounded mb-6" />
        <div className="space-y-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="flex justify-between">
                <div className="skeleton h-4 w-40 rounded" />
                <div className="skeleton h-4 w-12 rounded" />
              </div>
              <div className="skeleton h-2 w-full rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
