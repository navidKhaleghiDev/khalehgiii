import { Typography } from '@ui/atoms/Typography/Typography';
import { Card } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';
import { ETimeLimitDuration } from '@src/services/users/types';
import xIcon from '@iconify-icons/ph/x';

import {
  tomorrow,
  getNextSaturday,
  firstDayOfNextMonth,
} from '@src/helper/utils/dateUtils';
import {
  TimeLimitDurationLabel,
  TimeLimitDurationLabelDetails,
} from '@src/constants/accessTime';
import { formatDuration } from '@src/helper/utils/timeUtils';
import { AccessTimeModalCard } from './AccessTimeModalCard';

function getExtensionTime(label: ETimeLimitDuration): string {
  switch (label) {
    case ETimeLimitDuration.DAILY:
      return tomorrow.toLocaleDateString('fa-IR');

    case ETimeLimitDuration.WEEKLY:
      return getNextSaturday().toLocaleDateString('fa-IR');

    case ETimeLimitDuration.MONTHLY:
      return firstDayOfNextMonth.toLocaleDateString('fa-IR');

    case ETimeLimitDuration.PERMANENTLY:
      return 'ندارد';

    default:
      return '';
  }
}

// Use the `displayText` variable where needed

type PropsType = {
  onClick: (value: boolean) => void;
  timeLimitDuration: ETimeLimitDuration;
  timeLimitValueInHour: number;
  usageInMinute: number;
};
export function AccessTimeModal({
  onClick,
  timeLimitDuration,
  timeLimitValueInHour,
  usageInMinute,
}: PropsType) {
  const timeLimitValueInMinute = Math.floor(timeLimitValueInHour) * 60;
  const remainingTime = timeLimitValueInMinute - Math.floor(usageInMinute);

  let timeLeft;

  if (timeLimitDuration === ETimeLimitDuration.PERMANENTLY) {
    timeLeft = '';
  } else if (remainingTime < 0) {
    timeLeft = 'به اتمام رسیده است';
  } else {
    timeLeft = formatDuration(remainingTime);
  }
  return (
    <div className="w-full">
      <div className="flex w-full justify-end p-2">
        <IconButton
          icon={xIcon}
          color="tealNoBg"
          onClick={() => onClick(false)}
        />
      </div>
      <div className="px-16 pt-8 pb-16 w-full">
        <Card className="bg-teal-600 flex items-center justify-between h-10 text-white px-2">
          <Typography size="body3" color="white">
            زمان دسترسی
          </Typography>
          <div className="flex items-center justify-between w-1/2">
            <Typography size="body3" color="white">
              {TimeLimitDurationLabel[timeLimitDuration]}
            </Typography>
            |
            <Typography size="body3" color="white">
              {timeLimitValueInHour} ساعت
            </Typography>
          </div>
        </Card>
        <AccessTimeModalCard
          label="زمان استفاده شده"
          name={TimeLimitDurationLabelDetails[timeLimitDuration]}
          value={
            usageInMinute ? formatDuration(Math.floor(usageInMinute)) : '-'
          }
        />
        <AccessTimeModalCard
          label="زمان باقی مانده"
          name={TimeLimitDurationLabelDetails[timeLimitDuration]}
          value={timeLeft}
        />
        <AccessTimeModalCard
          label="زمان تمدید"
          name={getExtensionTime(timeLimitDuration)}
          value={
            timeLimitDuration !== ETimeLimitDuration.PERMANENTLY ? '00:01' : ''
          }
        />
      </div>
    </div>
  );
}
