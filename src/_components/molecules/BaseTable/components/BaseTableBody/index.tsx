import { useState } from 'react';

import { NoResult } from '@redesignUi/molecules/NoResult';
import { BaseTableRow } from '../BaseTableRow';

export function BaseTableBody({ body, header, onClick }) {
  const [openRowId, setOpenRowId] = useState(null);

  const toggleRowOpen = (id) => {
    setOpenRowId((prevId) => (prevId === id ? null : id));
  };

  return (
    <tbody>
      {body.length >= 1 ? (
        body.map((bodyItem, index) => {
          const borderRadiusT = index === 0 ? 'rounded-t-2xl' : '';
          const borderRadiusB =
            index === body.length - 1 ? 'rounded-b-2xl' : '';
          const isOpen = openRowId === bodyItem.id;

          return (
            <div key={bodyItem.id} className="w-full">
              <div
                className={`flex h-16 w-full border border-gray-200  ${
                  openRowId === bodyItem?.id ? 'bg-gray-400' : 'bg-white'
                } ${borderRadiusT} ${borderRadiusB}  `}
              >
                {header.map((headerItem) => (
                  <BaseTableRow
                    key={headerItem.id}
                    isOpen={isOpen}
                    row={bodyItem}
                    header={headerItem}
                    onClick={onClick}
                    toggleRowOpen={toggleRowOpen}
                    aria-label={bodyItem.name}
                  />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <NoResult />
      )}
    </tbody>
  );
}
