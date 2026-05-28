export default function NotificationsLoading() {
  return (
    <div className="page-container space-y-6">
      <div className="flex items-center justify-between">
        <div className="skeleton h-8 w-36 rounded-lg" />
        <div className="skeleton h-9 w-32 rounded-lg" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex gap-3">
            <div className="skeleton h-9 w-9 rounded-full flex-shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1.5">
              <div className="skeleton h-4 w-2/3 rounded" />
              <div className="skeleton h-3 w-1/3 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
