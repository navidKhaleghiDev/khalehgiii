import { useTranslation } from 'react-i18next';
import { VariantProps } from 'class-variance-authority';

import { Typography } from '@ui/atoms';

import { dateTitleStyle } from './styles';

export interface DateTitleProps extends VariantProps<typeof dateTitleStyle> {
  date: string;
}

export function DateTitle({ date, color }: DateTitleProps) {
  const { t } = useTranslation();
  return (
    <div
      className={`flex items-center gap-[0.18rem] ${dateTitleStyle({
        color,
      })} 
`}
    >
      <div className="flex-col gap-1 flex">
        <Typography
          variant="body6"
          color="neutralDark"
          className="ltr:text-left rtl:text-right"
        >
          {t('license.expirationDate')}
        </Typography>

        <Typography
          variant="body6"
          color="neutralMiddle"
          className="ltr:text-left rtl:text-right"
        >
          {date}
        </Typography>
      </div>
    </div>
  );
}