export function BaseTableSkeleton() {
  return (
    <tbody>
      <tr className="animate-pulse">
        <td aria-label="skeleton-table">
          <div className="h-16 bg-gray-300 rounded-t-2xl mb-1" />
          <div className="h-16 bg-gray-300 mb-1" />
          <div className="h-16 bg-gray-300 mb-1" />
          <div className="h-16 bg-gray-300 mb-1" />
          <div className="h-16 bg-gray-300 mb-1" />
          <div className="h-16 bg-gray-300 mb-1" />
          <div className="h-16 bg-gray-300 mb-1" />
          <div className="h-16 bg-gray-300 rounded-b-2xl mb-1" />
        </td>
      </tr>
      {/* Add more rows as needed */}
    </tbody>
  );
}
