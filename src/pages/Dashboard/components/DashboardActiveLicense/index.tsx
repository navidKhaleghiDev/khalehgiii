import moment from 'moment-jalaali';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { Typography } from '@ui/atoms';
import { LicenseCard } from '@ui/molecules/Cards/LicenseCard';
import { http } from '@src/services/http';
import { E_USERS_LICENSES } from '@src/services/users/endpoint';
import { LicenseCardProps } from '@ui/molecules/Cards/LicenseCard/types';
import { NoResult } from '@ui/molecules/NoResult';

type LicenseCardKeys =
  | 'sandbox'
  | 'users'
  | 'evidence_gathering'
  | 'clipboard'
  | 'pam'
  | 'online_assistance'
  | 'clipboard_log'
  | 'chatroom';

type LicenseFileType = {
  active: any;
  created?: string | null;
  expiry?: string;
  license: boolean;
  name: string;
  number: number;
  concurrent?: number;
};

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

export function DashboardActiveLicense() {
  const { t } = useTranslation();
  const { data, error } = useSWR(E_USERS_LICENSES, http.fetcherSWR);

  const licensesList: LicenseFileType[] = Array.isArray(data?.data)
    ? data.data
    : [];

  const onWheelHandle = (e: React.WheelEvent<HTMLDivElement>) => {
    e.currentTarget.scrollLeft -= e.deltaY;
  };

  return (
    <>
      <Typography color="black" variant="body4B">
        {t('dashboard.activeLicenses')}
      </Typography>
      {!error ? (
        <div
          className="flex w-full gap-2.5 overflow-x-auto py-5 px-1"
          onWheel={onWheelHandle}
        >
          {licensesList.map((license) => {
            const color = licenseCardsColor[license.name as LicenseCardKeys];
            return (
              <LicenseCard
                subValue={license.active || 0}
                totalValue={license.number || 0}
                title={license.name}
                date={
                  license.expiry
                    ? moment(license.expiry).format('jYYYY/jMM/jDD')
                    : '---'
                }
                className="flex-shrink-0 w-[12.125rem] sm:w-[15.875rem] hover:border-transparent active:border-transparent cursor-default dark:border-none"
                key={license.name}
                color={color}
              />
            );
          })}
        </div>
      ) : (
        <NoResult />
      )}
    </>
  );
}
