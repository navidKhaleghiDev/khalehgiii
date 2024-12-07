import { Typography } from '@ui/atoms/Typography/Typography';
import { Card } from '@ui/atoms';
import { Modal } from '@ui/molecules/Modal';
import { useState } from 'react';
import { IconButton } from '@ui/atoms/BaseButton';
import { TimeLimitDuration, DaAsParams } from '@src/services/users/types';
import handTapIcon from '@iconify-icons/ph/hand-tap';

import useSWR from 'swr';
import {
  E_USERS_DAAS_UPDATE_USAGE,
  E_USERS_PROFILE,
} from '@src/services/users/endpoint';
import { http } from '@src/services/http';
import { TimeLimitDurationLabel } from '@src/constants/accessTime';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { SwrResponse } from '@src/types/services';
import { useTranslation } from 'react-i18next';
import { AccessTimeModal } from './AccessTimeModal';

export function AccessTimeCO() {
  const [openModal, setOpenModal] = useState(false);
  const { t } = useTranslation();
  useSWR(E_USERS_DAAS_UPDATE_USAGE, http.fetcherSWR, {
    refreshInterval: 60000,
  });

  const { data, mutate, isLoading } = useSWR<SwrResponse<DaAsParams>>(
    E_USERS_PROFILE,
    http.fetcherSWR,
    {
      refreshInterval: 60000,
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const timeLimitDuration: TimeLimitDuration =
    data?.data?.daas_configs?.time_limit_duration ?? TimeLimitDuration.DAILY;

  const timeLimitValueInHour =
    data?.data?.daas_configs?.time_limit_value_in_hour ?? 0;

  return (
    <>
      <Card
        color="neutral"
        className="flex items-center justify-between w-80 px-2"
      >
        <Typography variant="body3" color="teal">
          {t('global.timeAccess')}
        </Typography>
        <div className="flex items-center justify-between w-1/2">
          <Typography variant="body3" color="neutral">
            {TimeLimitDurationLabel[timeLimitDuration]}
          </Typography>
          |
          <Typography variant="body3" color="neutral">
            {timeLimitValueInHour} {t('table.hours')}
          </Typography>
        </div>
        <IconButton
          icon={handTapIcon}
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
        classContainer="border border-teal-600 w-1/2 h-1/2"
        type="none"
        freeSize
      />
    </>
  );
}
