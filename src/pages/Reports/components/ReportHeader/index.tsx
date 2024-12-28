import { useTranslation } from 'react-i18next';

import { Typography } from '@ui/atoms';

export function ReportHeader() {
  const { t } = useTranslation();
  return (
    <div className="mb-[3.75rem]">
      <Typography variant="body2B" color="black">
        {t('dashboard.scanChart')}
      </Typography>
    </div>
  );
}
