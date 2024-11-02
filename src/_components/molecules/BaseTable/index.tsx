import { useEffect, useState } from 'react';

import { BaseTableHeader } from './components/BaseTableHeader';
import { BaseTableBody } from './components/BaseTableBody';

import { BaseTableProps, CategorizedData, IdItem } from './types';
import { Pagination } from '../Pagination';
import { BaseTableSkeleton } from './components/loading';

/**
 * A table component that displays data with customizable headers, body content,
 * and pagination. The component supports collapsing columns for mobile and desktop views
 * and handles both loading and non-loading states.
 *
 * @template T - A generic type representing the table body data, extending `IdItem`.
 * @param {BaseTableProps<T>} props - The props object for the table component.
 * @param {HeaderTable[]} props.header - An array of objects representing the table headers.
 * @param {T[]} props.body - An array of objects representing the table body content.
 * @param {boolean} props.loading - A flag to indicate whether the table is in a loading state.
 * @param {boolean} [props.isMobile=false] - Optional flag to determine if the table is rendered in mobile view.
 * @param {OnClickActionsType<T>} [props.onClick] - Optional callback function for handling row click actions.
 * @param {Pagination} props.pagination - An object containing pagination details.
 * @param {number} props.pagination.countPage - The total number of pages.
 * @param {number} props.pagination.currentPage - The current page being displayed.
 * @param {number} props.pagination.totalPages - The total number of pages available.
 * @param {function} props.pagination.onPageChange - Function to handle page change events.
 * @param {number} props.pagination.allItems - The total number of items.
 * @param {number} props.pagination.itemsPer - The number of items displayed per page.
 * @param {string} [props.pagination.paginationLabel] - Optional label for the pagination component.
 *
 * @returns {JSX.Element} The rendered table component.
 */

export function BaseTable<T extends IdItem>(
  props: BaseTableProps<T>
): JSX.Element {
  const {
    header,
    body,
    onClick,
    loading,
    isMobile = false,
    pagination,
  } = props;
  const {
    countPage,
    currentPage,
    totalPages,
    onPageChange,
    paginationLabel,
    allItems,
    itemsPer,
  } = pagination;
  const [headerCollapse, setHeaderCollapse] = useState<CategorizedData>({
    mobile: [],
    desktop: [],
    nonCollapsedMobile: [],
    nonCollapsedDesktop: [],
  });

  const isCollapse = headerCollapse.desktop.length >= 1;

  const updatedHeader = isMobile
    ? headerCollapse.nonCollapsedMobile
    : headerCollapse.nonCollapsedDesktop;

  const updatedHeaderForBody = isMobile
    ? headerCollapse.mobile
    : headerCollapse.desktop;

  useEffect(() => {
    const categorizedData = header.reduce<CategorizedData>(
      (acc, item) => {
        if (item.isCollapsed || item.isMobileCollapsed) {
          acc.mobile.push(item);
        }
        if (item.isCollapsed) {
          acc.desktop.push(item);
        }
        if (!item.isCollapsed && !item.isMobileCollapsed) {
          acc.nonCollapsedMobile.push(item);
        }
        if (!item.isCollapsed) {
          acc.nonCollapsedDesktop.push(item);
        }
        return acc;
      },
      {
        mobile: [],
        desktop: [],
        nonCollapsedMobile: [],
        nonCollapsedDesktop: [],
      }
    );
    setHeaderCollapse(categorizedData);
  }, [header]);

  return (
    <div className="w-auto ">
      <table className="w-full">
        {!isMobile && (
          <BaseTableHeader header={updatedHeader} collapse={isCollapse} />
        )}
        {loading ? (
          <BaseTableSkeleton />
        ) : (
          <BaseTableBody
            body={body}
            collapseHeader={updatedHeaderForBody}
            header={updatedHeader}
            onClick={onClick as BaseTableProps<IdItem>['onClick']}
            isMobile={isMobile}
          />
        )}
      </table>
      <div className="mt-5">
        {!!countPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            allItems={allItems}
            itemsPer={itemsPer}
            paginationLabel={paginationLabel}
          />
        )}
      </div>
    </div>
  );
}
