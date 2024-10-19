import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { IconButton } from '@ui/atoms/BaseButton';

export function BaseTableHeader({ header, onClick, collapse }) {
  const { t } = useTranslation();

  console.log(collapse);
  return (
    <thead className="w-full flex items-center justify-between rounded-lg h-8 bg-white mb-3">
      {header.map((head, index) => (
        <React.Fragment key={head.label}>
          <tr className={`${head.class}`}>
            <th
              className="flex justify-center
             "
            >
              <Typography variant="body5" color="neutral" type="p">
                {t(head.label)}
              </Typography>
              {head.sort === 'sort' && (
                <IconButton onClick={onClick} icon={icon} />
              )}
            </th>
          </tr>
        </React.Fragment>
      ))}
      {collapse && <div className=" w-1/12 h-10 bg-red-500  " />}
    </thead>
  );
}
