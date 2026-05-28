export default function TimetableLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-36 rounded-lg" />
      <div className="flex gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="skeleton h-9 w-24 rounded-lg" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-start gap-4">
              <div className="skeleton h-10 w-10 rounded-lg flex-shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-3/4 rounded" />
                <div className="skeleton h-3 w-1/2 rounded" />
                <div className="skeleton h-3 w-24 rounded" />
              </div>
            </div>
            <div className="mt-4 skeleton h-8 w-full rounded-lg" />
          </div>
        ))}
      </div>
    </div>
  );
}
