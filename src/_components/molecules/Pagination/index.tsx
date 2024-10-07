import PhCaretDoubleLeft from '@iconify-icons/ph/caret-double-left';
import PhCaretDoubleRight from '@iconify-icons/ph/caret-double-right';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Typography } from '@redesignUi/atoms';

/* eslint-disable no-plusplus */
interface PaginationProps {
  currentPage: number;
  allItems: number;
  itemsPer: number;
  totalPages: number;
  paginationLabel: string;
  onPageChange: (page: number) => void;
}

const mClass =
  'flex size-7 text-gray-500 justify-center rounded items-center hover:bg-gray-100';

const disableClass = 'bg-gray-300 cursor-not-allowed hover:bg-gray-300';
const activeClass =
  'bg-gray-100 flex items-center justify-center hover:bg-gray-200 cursor-not-allowed';
const arrowButtonClass =
  'bg-white border rounded border-neutral-200 text-neutral-500';

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

// Note: in iconButton we do not have rounded

export function Pagination({
  currentPage,
  allItems,
  itemsPer,
  totalPages,
  paginationLabel,
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
    <div className="bg-white flex items-center justify-between max-w-[68.75rem] rounded-lg p-1.5">
      <div className="flex justify-center items-center gap-2">
        <IconButton
          size="sm"
          color="neutralNoBg"
          icon={PhCaretDoubleLeft}
          className={`${mClass} ${
            isFirstPage ? disableClass : arrowButtonClass
          }`}
          onClick={handlePreviousClick}
        />
        {renderPageNumbers()}
        <IconButton
          size="sm"
          color="neutralNoBg"
          icon={PhCaretDoubleRight}
          className={`${mClass} ${
            isLastPage ? disableClass : arrowButtonClass
          }`}
          onClick={handleNextClick}
        />
      </div>
      <Typography color="neutralMiddle" className="hidden sm:block">
        {`نمایش ${itemsPer}  ${paginationLabel} از ${allItems}`}
      </Typography>
      <Typography color="neutralMiddle" className="block sm:hidden">
        {allItems} of {itemsPer}
      </Typography>
    </div>
  );
}

export default Pagination;
