// import WarningCircle from '@iconify-icons/ph/warning-circle';

import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';

interface ProgressBarProps {
  totalHours: number;
  usedMinutes: number;
  isPermanent?: boolean;
}

export function ProgressBarHelperCell({
  totalHours,
  usedMinutes,
  isPermanent = false,
}: ProgressBarProps) {
  const { t } = useTranslation();
  const totalMinutes = totalHours * 60;
  const progressPercentage = isPermanent
    ? 100
    : (usedMinutes / totalMinutes) * 100;

  const formatTime = (minutes: number): string => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = Math.floor(minutes % 60);
      return remainingMinutes > 0
        ? `${hours}h ${remainingMinutes}m`
        : `${hours}h`;
    }
    return `${Math.floor(minutes)}m`;
  };

  return (
    <div dir="ltr" className="flex items-end gap-2">
      <div className="flex flex-col gap-1">
        <Typography variant="body6" className="lg:self-start self-center">
          <span
            className={`${
              isPermanent ? 'text-teal-500 dark:text-teal-400' : 'text-gray-400'
            }`}
          >
            {isPermanent ? t('table.permanent') : formatTime(usedMinutes)}
          </span>
          <span className="text-teal-500">
            {!isPermanent && `/${totalHours}h`}
          </span>
        </Typography>
        <div className="h-2 lg:w-36 w-16 rounded-lg bg-teal-500 dark:bg-teal-400">
          <div
            style={{
              width: `${progressPercentage}%`,
              minWidth: `${progressPercentage <= 5 ? '8px' : '0'}`,
            }}
            className={`h-full bg-white dark:bg-gray-600 border border-gray-400 dark:border-500 rounded-lg ${
              isPermanent ? 'hidden' : ''
            } ${progressPercentage === 0 ? 'hidden' : ''}`}
          />
        </div>
      </div>
      {/* <BaseIcon icon={WarningCircle} className="translate-y-1 text-gray-400" /> */}
    </div>
  );
}
