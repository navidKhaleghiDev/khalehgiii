import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';

export function ReportHeader() {
  const { t } = useTranslation();
  return (
    <div className="mb-[3.75rem]">
      <Typography variant="body2B" color="black">
        {t('global.progressingChart')}
      </Typography>
      <Typography variant="body3" color="neutral">
        sep.npd-co.com
      </Typography>
    </div>
  );
}
