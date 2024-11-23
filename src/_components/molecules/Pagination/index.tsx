import { t } from 'i18next';

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
  'flex size-7 text-sm md:text-base text-gray-500 dark:text-gray-400 dark:bg-gray-600 justify-center rounded-lg items-center dark:hover:text-gray-300 dark:hover:bg-gray-700 hover:bg-gray-100';

const disableClass =
  'opacity-50 cursor-not-allowed hover:bg-white hover:text-gray-500 dark:hover:bg-transparent dark:hover:text-gray-400';
const activeClass =
  'bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 cursor-not-allowed';
const arrowButtonClass =
  'bg-white border rounded border-gray-200 dark:border-gray-500 text-gray-500';

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
    const generatePageNumbers = (): (number | string)[] => {
      if (totalPages <= 3) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }

      if (currentPage <= 2) {
        return [
          ...Array.from({ length: 3 }, (_, i) => i + 1),
          '...',
          totalPages,
        ];
      }

      if (currentPage >= totalPages - 2) {
        return [
          1,
          '...',
          ...Array.from({ length: 3 }, (_, i) => totalPages - 2 + i),
        ];
      }

      return [
        1,
        '...',
        ...Array.from({ length: 3 }, (_, i) => currentPage - 1 + i),
        '...',
        totalPages,
      ];
    };

    return generatePageNumbers().map((number, index) => {
      const isEllipsis = number === '...';
      const keyIndex = `${number}${index}`;

      return (
        <button
          type="button"
          className={`${mClass} ${
            currentPage === number ? activeClass : 'bg-white text-gray-600'
          }`}
          disabled={isEllipsis}
          key={keyIndex}
          onClick={() => !isEllipsis && handlePageChange(number as number)}
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
      className="bg-white dark:bg-gray-600 flex items-center justify-between rounded-lg p-1.5"
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
      <Typography
        color="neutralMiddle"
        className="hidden sm:block text-sm md:text-base"
      >
        {`${t('global.show')} ${itemsPer}  ${paginationLabel} ${t(
          'global.of'
        )} ${allItems}`}
      </Typography>
      <Typography
        color="neutralMiddle"
        className="block sm:hidden text-sm md:text-base"
      >
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
