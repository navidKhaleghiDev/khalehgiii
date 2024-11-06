import moment from 'moment-jalaali';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { ServiceCard } from '@redesignUi/molecules/Cards/ServiceCard';
import { E_ANALYZE_SCAN_STATS } from '@src/services/analyze/endpoint';
import { IScanStats } from '@src/services/analyze/types';
import { HTTP_ANALYSES } from '@src/services/http';
import { ISwrResponse } from '@src/types/services';
import { useLanguage } from '@context/settings/languageContext';

type ServiceInfoProps = {
  className?: string;
};

export function ServiceInfo({ className }: ServiceInfoProps) {
  const { data } = useSWR<ISwrResponse<IScanStats>>(
    E_ANALYZE_SCAN_STATS,
    HTTP_ANALYSES.fetcherSWR
  );
  const { t } = useTranslation();
  const { isFarsi } = useLanguage();
  const remainingDays = data?.data?.info?.remaining_days || ' 0';
  const nowDate = isFarsi
    ? moment().format('jYYYY/jMM/jDD')
    : moment().format('YYYY/MM/DD');

  return (
    <ServiceCard
      subValue={Number(remainingDays)}
      totalValue={365}
      title={t('dashboard.netsep')}
      date={nowDate}
      className={className}
    />
  );
}
