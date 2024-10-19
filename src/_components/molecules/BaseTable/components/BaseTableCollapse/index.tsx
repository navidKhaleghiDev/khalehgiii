/* eslint-disable react/jsx-no-useless-fragment */
import { BaseTableCollapseMobile } from './BaseTableCollapseMobile';
import { BaseTableCollapseDesktop } from './BaseTableCollapseDesktop';
import { BaseTableCollapseProps, IdItem } from '../../types';

export function BaseTableCollapse<T extends IdItem>(
  props: BaseTableCollapseProps<T>
) {
  const { isMobile, collapseHeader, row, onClick } = props;

  return (
    <>
      {isMobile ? (
        <BaseTableCollapseMobile
          header={collapseHeader}
          row={row}
          onClick={onClick}
        />
      ) : (
        <BaseTableCollapseDesktop
          header={collapseHeader}
          row={row}
          onClick={onClick}
        />
      )}
    </>
  );
}
