import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { BaseTableHeader } from './components/BaseTableHeader';
import { BaseTableBody } from './components/BaseTableBody';

export function BaseTable(props) {
  const { header, body, onClick, loading, isMobile = false } = props;
  const [headerCollapse, setHeaderCollapse] = useState({
    mobile: [],
    desktop: [],
    nonCollapsedMobile: [],
    nonCollapsedDesktop: [],
  });

  const updatedHeader = isMobile
    ? headerCollapse.nonCollapsedMobile
    : headerCollapse.nonCollapsedDesktop;

  const updatedHeaderForBody = isMobile
    ? headerCollapse.nonCollapsedMobile
    : headerCollapse.nonCollapsedDesktop;

  useEffect(() => {
    const categorizedData = header.reduce(
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
    <table className="w-full table-auto">
      <BaseTableHeader
        header={updatedHeader}
        onClick={onClick}
        collapse={headerCollapse.desktop.length >= 1}
      />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <BaseTableBody
          body={body}
          header={updatedHeader}
          onClick={onClick}
          isMobile={isMobile}
        />
      )}
    </table>
  );
}
