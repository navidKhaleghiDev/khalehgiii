/* eslint-disable no-plusplus */
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
const mClass =
  'flex w-8 h-8 mx-0.5 p-0 justify-center items-center rounded-md leading-tight text-xl border border-teal-500 ';

const disableClass =
  'bg-gray-300 text-gray-500 cursor-not-allowed border-gray-400';
const activeClass = 'bg-teal-500 text-white cursor-not-allowed';
const arrowButtonClass = 'bg-teal-500 text-white';

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
            currentPage === number ? activeClass : 'bg-white text-teal-500'
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
    <div className="flex justify-center items-center mt-4">
      <button
        type="button"
        className={`${mClass} ${isFirstPage ? disableClass : arrowButtonClass}`}
        onClick={handlePreviousClick}
      >
        {`<<`}
      </button>
      {renderPageNumbers()}
      <button
        type="button"
        className={`${mClass} ${isLastPage ? disableClass : arrowButtonClass}`}
        onClick={handleNextClick}
      >
        {`>>`}
      </button>
    </div>
  );
}

export default Pagination;
