export default function AIAssistantLoading() {
  return (
    <div className="page-container flex flex-col h-[calc(100vh-4rem)]">
      <div className="skeleton h-8 w-40 rounded-lg mb-6" />
      <div className="flex-1 rounded-xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 p-6 flex flex-col gap-4">
        <div className="skeleton h-10 w-full rounded-lg" />
        <div className="flex-1 flex flex-col gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "" : "justify-end"}`}>
              {i % 2 === 0 && <div className="skeleton h-8 w-8 rounded-full flex-shrink-0" />}
              <div className={`skeleton h-16 rounded-xl ${i % 2 === 0 ? "w-2/3" : "w-1/2"}`} />
            </div>
          ))}
        </div>
        <div className="skeleton h-12 w-full rounded-lg" />
      </div>
    </div>
  );
}
