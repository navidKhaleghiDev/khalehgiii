/* eslint-disable react/jsx-no-useless-fragment */
import { BaseTableCollapseMobile } from './BaseTableCollapseMobile';
import { BaseTableCollapseDesktop } from './BaseTableCollapseDesktop';
import { BaseTableCollapseProps, IdItem } from '../../types';

/**
 * Renders a collapsible table row component that adapts to mobile and desktop layouts.
 * Depending on the `isMobile` prop, it either renders the mobile or desktop version
 * of the collapsible component.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableCollapseProps<T>} props - The props object for the collapsible table component.
 * @param {boolean} props.isMobile - Indicates whether the component is being rendered in a mobile layout.
 * @param {Array} props.collapseHeader - The header configuration for the collapsible content.
 * @param {T} props.row - The data for the current row, containing the information to be displayed in the collapsible section.
 * @param {function} [props.onClick] - Optional callback function for handling click actions on the collapsible row.
 *
 * @returns {JSX.Element} The rendered collapsible table component, either for mobile or desktop.
 */

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
