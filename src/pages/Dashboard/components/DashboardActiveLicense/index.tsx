import moment from 'moment-jalaali';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { Typography } from '@redesignUi/atoms';
import { LicenseCard } from '@redesignUi/molecules/Cards/LicenseCard';
import { LoadingPage } from '@redesignUi/molecules/Loading';
import { http } from '@src/services/http';
import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { LicenseCardProps } from '@redesignUi/molecules/Cards/LicenseCard/types';
import { LicenseFileType } from '@src/pages/Dashboard/License/SettingMalwareCard/type';

type LicenseCardKeys =
  | 'sandbox'
  | 'users'
  | 'evidence_gathering'
  | 'clipboard'
  | 'pam'
  | 'online_assistance'
  | 'clipboard_log'
  | 'chatroom';

const licenseCardsColor: Record<LicenseCardKeys, LicenseCardProps['color']> = {
  sandbox: 'blue',
  users: 'red',
  evidence_gathering: 'tealLight',
  clipboard: 'yellow',
  pam: 'tealDark',
  online_assistance: 'purple',
  clipboard_log: 'purpleLight',
  chatroom: 'blueLight',
};

export default function DashboardActiveLicense() {
  const { t } = useTranslation();
  const { data, isLoading, error } = useSWR(E_USERS_LICENSES, http.fetcherSWR);

  if (isLoading) return <LoadingPage />;

  const licensesList: LicenseFileType[] = Array.isArray(data?.data)
    ? data.data
    : [];

  if (!error) {
    return (
      <>
        <Typography color="black" variant="body4B">
          {t('dashboard.activeLicenses')}
        </Typography>
        <div className="flex w-full gap-2.5 overflow-x-auto py-5 px-1">
          {licensesList.map((license) => {
            const color = licenseCardsColor[license.name as LicenseCardKeys];
            return (
              <LicenseCard
                subValue={license.active || 0}
                totalValue={license.number || 0}
                title={license.name}
                date={moment(license.expiry).format('jYYYY/jMM/jDD')}
                className="flex-shrink-0 w-[12.125rem] sm:w-[15.875rem] hover:border-transparent active:border-transparent cursor-default"
                key={license.name}
                color={color}
              />
            );
          })}
        </div>
      </>
    );
  }
}
