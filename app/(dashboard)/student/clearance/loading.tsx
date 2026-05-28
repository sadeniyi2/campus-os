export default function ClearanceLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-36 rounded-lg" />
      <div className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <div className="skeleton h-5 w-40 rounded mb-6" />
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center gap-2 min-w-[100px]">
              <div className="skeleton h-12 w-12 rounded-full" />
              <div className="skeleton h-3 w-20 rounded" />
              <div className="skeleton h-5 w-16 rounded-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900">
            <div className="skeleton h-5 w-28 rounded mb-3" />
            <div className="skeleton h-4 w-20 rounded-full mb-2" />
            <div className="skeleton h-3 w-full rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
