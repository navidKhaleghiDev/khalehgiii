import { Typography } from '@redesignUi/atoms';
import { DoughnutChart } from '@redesignUi/atoms/DoughnutChart';
import { CardButton } from '@ui/atoms/Card/CardButton';

import { DateTitle } from './compnents/DateTitle';
import { LicenseCardProps } from './types';

export function LicenseCard({
  subValue,
  totalValue,
  onClick,
  color,
  title,
  date,
  dark,
}: LicenseCardProps) {
  return (
    <CardButton
      border
      borderColor="neutral"
      className="w-64 h-28 p-5 flex items-center outline-none text-right overflow-hidden"
      color="neutral"
      onClick={onClick}
      shadow="sm"
    >
      <div className="w-full flex items-center gap-5 flex-row-reverse">
        <div className="flex flex-col items-start gap-2 w-2/3 box-border leading-3">
          <Typography variant="body6B" color="black">
            {title}
          </Typography>
          <DateTitle color={color} date={date} />
        </div>
        <div className="w-1/3">
          <DoughnutChart
            subValue={subValue}
            totalValue={totalValue}
            color={color}
            dark={dark}
          />
        </div>
      </div>
    </CardButton>
  );
}
