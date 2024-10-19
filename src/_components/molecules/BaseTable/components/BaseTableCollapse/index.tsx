import React from 'react';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { BaseTableRenderComponent } from '../BaseTableRenderComponent';

export function BaseTableCollapse(props) {
  const { t } = useTranslation();
  const { isMobile, collapseHeader, header, row, onClick } = props;

  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isMobile ? (
        <>
          {collapseHeader.map((headerList) => (
            <tr
              key={header.id}
              className="flex justify-between w-full h-10 bg-gray-100 last:border-b-0 first:border-t-0 border border-gray-300 border-x-0 "
            >
              <Typography color="neutral" variant="body6">
                {t(headerList.label)}
              </Typography>
              <td aria-label={headerList}>
                <BaseTableRenderComponent
                  row={row}
                  header={headerList}
                  onClick={onClick}
                />
              </td>
            </tr>
          ))}
        </>
      ) : (
        <tr className="flex justify-between h-16 bg-gray-100 border border-gray-400 border-t-0 transition duration-150 ease-in-out">
          {collapseHeader.map((headerList) => (
            <tr key={headerList}>
              <td className="h-14 flex-col px-3 flex gap-2 justify-start">
                <Typography color="neutral" variant="body6">
                  {t(headerList.label)}
                </Typography>
                <BaseTableRenderComponent
                  row={row}
                  header={headerList}
                  onClick={onClick}
                />
              </td>
            </tr>
          ))}
        </tr>
      )}
    </>
  );
}
