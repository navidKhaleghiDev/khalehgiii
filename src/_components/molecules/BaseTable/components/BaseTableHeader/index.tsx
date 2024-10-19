import { useTranslation } from 'react-i18next';
import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { BaseTableHeaderProps } from '../../types';

export function BaseTableHeader({ header, collapse }: BaseTableHeaderProps) {
  const { t } = useTranslation();

  return (
    <thead className="w-full px-3 flex items-center justify-between rounded-lg h-8 bg-white mb-3">
      {header.map((head) => (
        <tr className={`${head.class}`} key={head.label}>
          <th className="flex justify-center">
            <Typography variant="body5" color="neutral" type="p">
              {t(head.label as string)}
            </Typography>
          </th>
        </tr>
      ))}
      {collapse && <tr className=" w-1/12  h-10 " />}
    </thead>
  );
}
