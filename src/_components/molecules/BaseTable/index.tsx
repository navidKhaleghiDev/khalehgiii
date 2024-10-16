import { useEffect, useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { BaseTableHeader } from './components/BaseTableHeader';
import { BaseTableBody } from './components/BaseTableBody';

export function BaseTable(props) {
  const { header, body, onClick, loading, isMobile = false } = props;
  const [collapseItems, setCollapseItems] = useState({
    mobile: [],
    desktop: [],
  });

  const filterCollpsedDesktop = header.filter((item) => item.isCollapsed);
  const filterCollpsedMobile = header.filter((item) => item.isCollapsed);

  useEffect(() => {
    setCollapseItems({
      mobile: filterCollpsedMobile,
      desktop: filterCollpsedDesktop,
    });
  }, [filterCollpsedDesktop, filterCollpsedMobile]);

  return (
    <table className="w-full table-auto">
      <BaseTableHeader header={collapseItems} isMobile={isMobile} />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <BaseTableBody
          body={body}
          header={header}
          onClick={onClick}
          isMobile={isMobile}
        />
      )}
    </table>
  );
}
