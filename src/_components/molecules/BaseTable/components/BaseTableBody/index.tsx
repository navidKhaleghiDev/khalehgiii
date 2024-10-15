import { useState } from 'react';

import { NoResult } from '@redesignUi/molecules/NoResult';
import { BaseTableDesktopRow } from '../BaseTableDesktopRow';
import { BaseTableMobileRow } from '../BaseTableMobileRow';

export function BaseTableBody({ body, header, onClick }) {
  return (
    <tbody>
      {body.length >= 1 ? (
        body.map((bodyItem, index) => {
          return (
            <div key={bodyItem.id} className="w-full">
              <BaseTableMobileRow
                body={body}
                row={bodyItem}
                header={header}
                onClick={onClick}
                index={index}
              />
            </div>
          );
        })
      ) : (
        <NoResult />
      )}
    </tbody>
  );
}
