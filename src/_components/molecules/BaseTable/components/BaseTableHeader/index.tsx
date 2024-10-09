import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms/Typography/Typography';

export function BaseTableHeader({ header }) {
  const { t } = useTranslation();

  return (
    <thead className="flex items-center">
      {header.map((head) => {
        return (
          <tr key={head.label} dir={!head.dir ? 'ltr' : head.dir}>
            <th>
              <Typography variant="body4" type="div">
                {t(head.label)}
              </Typography>
            </th>
          </tr>
        );
      })}
    </thead>
  );
}
