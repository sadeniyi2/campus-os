export default function AnnouncementsLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="skeleton h-8 w-48 rounded-lg" />
      <div className="skeleton h-10 w-full rounded-lg" />
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3 mb-4">
              <div className="skeleton h-10 w-10 rounded-full" />
              <div className="space-y-1.5">
                <div className="skeleton h-4 w-28 rounded" />
                <div className="skeleton h-3 w-20 rounded" />
              </div>
              <div className="ml-auto skeleton h-5 w-16 rounded-full" />
            </div>
            <div className="space-y-2">
              <div className="skeleton h-4 w-full rounded" />
              <div className="skeleton h-4 w-5/6 rounded" />
              <div className="skeleton h-4 w-3/4 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
