/* eslint-disable consistent-return */
import { useRef, useEffect, useCallback } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  loading: boolean;
}

export function ScrollPagination({
  currentPage,
  totalPages,
  onPageChange,
  loading,
}: PaginationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    if (loading || currentPage >= totalPages) return;

    const container = containerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      // Added a check for whether there's enough content to scroll
      if (
        scrollWidth > clientWidth &&
        scrollLeft + clientWidth >= scrollWidth - 10
      ) {
        onPageChange(currentPage + 1);
      }
    }
  }, [currentPage, loading, onPageChange, totalPages]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [loading, currentPage, totalPages, handleScroll]);

  return (
    <div className="flex justify-center items-center mt-4">
      <div
        className="flex overflow-x-auto px-2"
        style={{ maxWidth: '200px' }}
        ref={containerRef}
      >
        {/* Placeholder content for scrollable area */}
        <div className="flex-shrink-0" style={{ width: '100%' }}>
          {/* Add more items or content here if needed */}
        </div>
      </div>
    </div>
  );
}
