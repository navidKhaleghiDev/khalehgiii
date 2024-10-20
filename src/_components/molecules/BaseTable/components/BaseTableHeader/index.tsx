import { useTranslation } from 'react-i18next';
import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { BaseTableHeaderProps } from '../../types';
import { baseTableHeaderStyles } from '../../styles';

export function BaseTableHeader({ header, collapse }: BaseTableHeaderProps) {
  const { t } = useTranslation();

  return (
    <thead className={baseTableHeaderStyles()}>
      {header.map((head) => (
        <tr className={`${head.class}`} key={head.id as string}>
          <th className="flex justify-center">
            <Typography variant="body6" type="p">
              {t(head.label as string)}
            </Typography>
          </th>
        </tr>
      ))}
      {collapse && <tr className="w-1/12 h-10" />}
    </thead>
  );
}
