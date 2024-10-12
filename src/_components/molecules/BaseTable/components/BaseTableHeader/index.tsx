import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms/Typography/Typography';

export function BaseTableHeader({ header }) {
  const { t } = useTranslation();

  return (
    <thead className="w-full flex items-center rounded-lg h-8 bg-white mb-3 ">
      {header.map((head) => {
        return (
          <tr key={head.label} className="px-5">
            <th>
              <Typography variant="body5" color="neutral" type="div">
                {t(head.label)}
              </Typography>
            </th>
          </tr>
        );
      })}
    </thead>
  );
}
