import { VariantProps } from 'class-variance-authority';
import { Typography } from '@redesignUi/atoms';

import { dateTitleStyle } from './styles';

interface DateTitleProps extends VariantProps<typeof dateTitleStyle> {
  date: string;
}

export function DateTitle({ date, color }: DateTitleProps) {
  return (
    <div
      className={`flex gap-[0.18rem] ${dateTitleStyle({
        color,
      })} 
`}
    >
      <div className="flex-col gap-1 flex leading-4">
        <Typography variant="body6B" color="neutralDark">
          تاریخ انقضا
        </Typography>
        <Typography variant="body6" color="neutralMiddle">
          {date}
        </Typography>
      </div>
    </div>
  );
}
