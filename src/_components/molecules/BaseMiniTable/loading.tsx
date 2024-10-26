export function BaseMiniTableSkeleton() {
  return (
    <div className="animate-pulse">
      <div aria-label="skeleton-table">
        <div className="h-7 bg-gray-300 rounded-lg mb-1" />
        <div className="h-7 bg-gray-300 mb-1 rounded-lg " />
        <div className="h-7 bg-gray-300 mb-1 rounded-lg " />
      </div>
    </div>
  );
}
