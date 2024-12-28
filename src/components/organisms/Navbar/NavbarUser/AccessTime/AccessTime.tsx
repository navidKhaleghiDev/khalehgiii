import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useSWR from 'swr';

import { DaAsParams } from '@src/services/users/types';
import {
  E_USERS_DAAS_UPDATE_USAGE,
  E_USERS_PROFILE,
} from '@src/services/users/endpoint';
import UserFocus from '@iconify-icons/ph/user-focus';
import { http } from '@src/services/http';
import { SwrResponse } from '@src/types/services';
import { AccessTimeModal } from '@ui/organisms/Navbar/NavbarUser/AccessTime/AccessTimeModal';
import { Card, Typography } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';
import { Modal } from '@ui/molecules/Modal';
import { LoadingSpinner } from '@ui/molecules/Loading';
import PhInfo from '@iconify-icons/ph/info';

export function AccessTime() {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  useSWR(E_USERS_DAAS_UPDATE_USAGE, http.fetcherSWR, {
    refreshInterval: 60000,
  });

  const { data, isLoading, mutate } = useSWR<SwrResponse<DaAsParams>>(
    E_USERS_PROFILE,
    http.fetcherSWR,
    {
      refreshInterval: 60000,
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const timeLimitValueInHour =
    data?.data?.daas_configs?.time_limit_value_in_hour ?? 0;

  return (
    <>
      <Card
        color="neutral"
        className="flex items-center justify-around w-[15.93rem] h-10"
      >
        <Typography variant="body5" color="neutral">
          {t('global.timeAccess')}
        </Typography>
        <Typography variant="body5" color="teal">
          {timeLimitValueInHour} {t('table.hours')}
        </Typography>
        <IconButton
          icon={PhInfo}
          size="md"
          color="neutralNoBg"
          onClick={() => {
            mutate();
            setOpenModal(true);
          }}
        />
      </Card>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        content={<AccessTimeModal daas={data?.data} />}
        icon={UserFocus}
        type="content"
        title={t('table.access')}
      />
    </>
  );
}
