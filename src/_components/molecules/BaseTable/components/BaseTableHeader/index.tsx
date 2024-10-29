import { useTranslation } from 'react-i18next';

import { useLanguage } from '@context/settings/languageContext';
import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { BaseTableHeaderProps } from '../../types';
import { baseTableHeaderStyles } from '../../styles';

/**
 * Renders the table header for the `BaseTable` component, supporting dynamic language-based className changes
 * and the ability to collapse certain columns.
 *
 * @param {BaseTableHeaderProps} props - The props object for the table header component.
 * @param {HeaderTable[]} props.header - An array of header items defining the columns of the table.
 * Each header item includes a label, class, and id.
 * @param {boolean} props.collapse - A flag that determines if the table header has collapsed columns.
 *
 * @returns {JSX.Element} The rendered table header component.
 */

export function BaseTableHeader({ header, collapse }: BaseTableHeaderProps) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  const isFarsi = lang === 'fa';

  return (
    <thead className={baseTableHeaderStyles()}>
      {header.map((head) => {
        const className =
          !isFarsi && head?.class?.includes('mr-auto')
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
      {collapse && <tr className="w-1/12 h-10 " />}
    </thead>
  );
}
