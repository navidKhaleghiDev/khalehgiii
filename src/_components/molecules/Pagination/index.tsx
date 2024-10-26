import PhCaretDoubleLeft from '@iconify-icons/ph/caret-double-left';
import PhCaretDoubleRight from '@iconify-icons/ph/caret-double-right';
import PhCaretRight from '@iconify-icons/ph/caret-right';
import PhCaretLeft from '@iconify-icons/ph/caret-left';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Typography } from '@redesignUi/atoms';

type PaginationProps = {
  currentPage: number;
  allItems?: number;
  itemsPer?: number;
  totalPages: number;
  paginationLabel?: string;
  onPageChange: (page: number) => void;
  headerPagination?: boolean;
};

const mClass =
  'flex size-7 text-gray-500 dark:text-gray-400 dark:bg-gray-600 justify-center rounded-lg items-center dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100';

const disableClass = 'bg-gray-300 cursor-not-allowed hover:bg-gray-300';
const activeClass =
  'bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 cursor-not-allowed';
const arrowButtonClass =
  'bg-white border rounded border-neutral-200 dark:border-gray-500 text-neutral-500';

/**
 * Pagination component for navigating through pages.
 *
 * @component
 *
 * @param {number} props.currentPage - The current active page.
 * @param {number} props.allItems - The total number of pages.
 * @param {number} props.itemsPer - The total number of pages.
 * @param {number} props.totalPages - The total number of pages.
 * @param {string} props.paginationLabel - The total number of pages.
 * @param {Function} props.onPageChange - Callback function called when the page changes.
 *
 * @returns {JSX.Element | null} The Pagination component.
 */

// Note: in iconButton we do not have rounded

export function Pagination(props: PaginationProps): JSX.Element | null {
  const {
    currentPage,
    allItems,
    itemsPer,
    totalPages,
    paginationLabel,
    headerPagination,
    onPageChange,
  } = props;

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
      for (let i = 1; i <= totalPages; i += 1) {
        pageNumbers.push(i);
      }
    } else if (currentPage <= 3) {
      for (let i = 1; i <= 5; i += 1) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 2) {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = totalPages - 4; i <= totalPages; i += 1) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push('...');
      for (let i = currentPage - 1; i <= currentPage + 1; i += 1) {
        pageNumbers.push(i);
      }
      pageNumbers.push('...');
      pageNumbers.push(totalPages);
    }

    return pageNumbers.map((number, index) => {
      const isEllipsis = number === '...';
      const keyItem = index;

      return (
        <button
          type="button"
          className={`${mClass} ${
            currentPage === number ? activeClass : 'bg-white text-gray-600'
          }`}
          disabled={isEllipsis}
          key={keyItem}
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
  return !headerPagination ? (
    <div
      dir="ltr"
      className="bg-white dark:bg-gray-600 flex items-center justify-between max-w-[68.75rem] rounded-lg p-1.5"
    >
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
  ) : (
    <div className="flex gap-2.5" dir="ltr">
      <IconButton
        size="sm"
        color="neutral"
        icon={PhCaretLeft}
        className={`${mClass} ${isFirstPage ? disableClass : arrowButtonClass}`}
        onClick={handlePreviousClick}
      />
      <IconButton
        size="sm"
        color="neutral"
        icon={PhCaretRight}
        className={`${mClass} ${isLastPage ? disableClass : arrowButtonClass}`}
        onClick={handleNextClick}
      />
    </div>
  );
}
