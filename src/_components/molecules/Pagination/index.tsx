import PhCaretLeft from '@iconify-icons/ph/caret-left';
import PhCaretRight from '@iconify-icons/ph/caret-right';
import { IconButton } from '@ui/atoms/BaseButton';

/* eslint-disable no-plusplus */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const mClass =
  'flex size-6 justify-center px-2 rounded items-center hover:bg-gray-100 text-base';

const disableClass = 'bg-gray-300 cursor-not-allowed ';
const activeClass =
  'bg-gray-200 hover:bg-gray-200  rounded-lg items-center justify-center cursor-not-allowed';
const arrowButtonClass = 'bg-teal-500 ';

/**
 * Pagination component for navigating through pages.
 *
 * @component
 *
 * @param {Object} props - The properties for the Pagination component.
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.totalPages - The total number of pages.
 * @param {Function} props.onPageChange - Callback function called when the page changes.
 *
 * @returns {JSX.Element | null} The Pagination component.
 */

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    onPageChange(page);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number) => {
      const isEllipsis = number === '...';

      return (
        <button
          type="button"
          className={`${mClass} ${
            currentPage === number ? activeClass : 'bg-white text-gray-600'
          }`}
          disabled={isEllipsis}
          key={number}
          onClick={() => handlePageChange(number as number)}
        >
          {number}
        </button>
      );
    });
  };

  if (totalPages < 2) {
    return null;
  }

  return (
    <div className="flex justify-center items-center gap-4">
      <IconButton
        icon={PhCaretRight}
        className={`${mClass} ${isFirstPage ? disableClass : arrowButtonClass}`}
        color="neutralNoBg"
        onClick={handlePreviousClick}
      />
      {renderPageNumbers()}
      <IconButton
        icon={PhCaretLeft}
        className={`${mClass} ${isLastPage ? disableClass : arrowButtonClass}`}
        color="neutralNoBg"
        onClick={handleNextClick}
      />
    </div>
  );
}

export default Pagination;
