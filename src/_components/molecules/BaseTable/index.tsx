import { useEffect, useState } from 'react';

import { BaseTableHeader } from './components/BaseTableHeader';
import { BaseTableBody } from './components/BaseTableBody';

import { BaseTableProps, CategorizedData, IdItem } from './types';
import { Pagination } from '../Pagination';

export function BaseTable<T extends IdItem>(props: BaseTableProps<T>) {
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
          '...loading'
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
