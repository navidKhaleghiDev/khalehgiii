import { useTranslation } from 'react-i18next';

import { useLanguage } from '@context/settings/languageContext';
import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { BaseTableHeaderProps } from '../../types';
import { baseTableHeaderStyles } from '../../styles';

export function BaseTableHeader({ header, collapse }: BaseTableHeaderProps) {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  return (
    <thead className={baseTableHeaderStyles()}>
      {header.map((head) => {
        const className =
          lang === 'en' && head?.class?.includes('mr-auto')
            ? head.class.replace('mr-auto', 'ml-auto')
            : head?.class;
        return (
          <tr className={className} key={head.id as string}>
            <th className={`flex justify-start `}>
              <Typography type="p" className="font-normal">
                {t(head.label as string)}
              </Typography>
            </th>
          </tr>
        );
      })}
      {collapse && <tr className="w-1/12 h-10" />}
    </thead>
  );
}
