import React from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { IconButton } from '@ui/atoms/BaseButton';

export function BaseTableHeader({ header, onClick, collapse }) {
  const { t } = useTranslation();

  return (
    <thead className="w-full px-3 flex items-center justify-between rounded-lg h-8 bg-white mb-3">
      {header.map((head, index) => (
        <tr className={`${head.class}`} key={head.label}>
          <th
            className="flex justify-center
             "
          >
            <Typography variant="body5" color="neutral" type="p">
              {t(head.label)}
            </Typography>
            {/* {head.sort === 'sort' && <IconButton onClick={onClick} />} */}
          </th>
        </tr>
      ))}
      {collapse && <tr className=" w-1/12  h-10 " />}
    </thead>
  );
}
