export default function AssignmentsLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-36 rounded-lg" />
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 flex items-center gap-4">
            <div className="skeleton h-10 w-10 rounded-lg flex-shrink-0" />
            <div className="flex-1 space-y-1.5">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
            <div className="skeleton h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
