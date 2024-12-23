import { Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

export function Legend() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-row sm:flex-col items-start justify-start gap-2.5 pt-5 shrink-0">
      <Typography
        className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-blue-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
        variant="body6"
        color="neutral"
      >
        {t('fileScan.scannedFiles')}
      </Typography>
      <Typography
        className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-purple-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
        variant="body6"
        color="neutral"
      >
        {t('dashboard.virusFiles')}
      </Typography>
      <Typography
        className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-teal-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
        variant="body6"
        color="neutral"
      >
        {t('dashboard.userBehavior')}
      </Typography>
    </div>
  );
}
