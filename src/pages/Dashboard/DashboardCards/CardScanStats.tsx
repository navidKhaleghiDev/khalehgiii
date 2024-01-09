import { Card } from './Card';
import certificateIcon from '@iconify-icons/ph/certificate';
import scanIcon from '@iconify-icons/ph/scan';

import useSWR from 'swr';
import { ISwrResponse } from '@src/types/services';
import { IScanStats } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { http_analyses } from '@src/services/http';
import { useTranslation } from 'react-i18next';

export function CardScanStats() {
  const { t } = useTranslation();
  const { data } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    http_analyses.fetcherSWR
  );
  const todayScans = data?.data?.info?.today_scans || '-';
  const remainingDays = data?.data?.info?.remaining_days || '-';

  return (
    <>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={scanIcon}
          title={t('dashboard.numberOfTodayScans')}
          description={`${todayScans}`}
        />
      </div>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={certificateIcon}
          title={t('dashboard.dayLeft')}
          description={`${remainingDays}`}
        />
      </div>
    </>
  );
}
