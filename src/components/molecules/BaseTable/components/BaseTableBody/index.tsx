import React from 'react';

import { NoResultTable } from '@ui/molecules/BaseTable/components/NoResultTable';

import { BaseTableRow } from '../BaseTableRow';
import { BaseTableBodyProps } from '../../types';

/**
 * Renders the body of the table for the `BaseTable` component, displaying each row
 * based on the provided body data. If no body data is available, a no-result component is shown.
 *
 * @param {BaseTableBodyProps} props - The props object for the table body component.
 * @param {BodyType[]} props.body - An array of objects representing the rows of the table.
 * @param {HeaderTable[]} props.header - An array of objects representing the table headers.
 * @param {OnClickActionsType<BodyType>} [props.onClick] - Optional callback function for handling row click actions.
 * @param {boolean} [props.isMobile] - Optional flag to determine if the table is rendered in mobile view.
 * @param {CategorizedData} props.collapseHeader - Data defining which headers are collapsed.
 *
 * @returns {JSX.Element} The rendered table body component.
 */

export function BaseTableBody({
  body,
  header,
  onClick,
  isMobile,
  collapseHeader,
}: BaseTableBodyProps): JSX.Element {
  return (
    <tbody>
      {body.length >= 1 ? (
        body.map((bodyItem, index) => {
          return (
            <React.Fragment key={bodyItem.id}>
              <BaseTableRow
                isMobile={isMobile}
                collapseHeader={collapseHeader}
                body={body}
                row={bodyItem}
                header={header}
                onClick={onClick}
                index={index}
              />
            </React.Fragment>
          );
        })
      ) : (
        <NoResultTable />
      )}
    </tbody>
  );
}
