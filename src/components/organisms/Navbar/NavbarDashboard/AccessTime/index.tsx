import { Typography } from "@ui/atoms/Typography/Typography";
import { Card } from "@ui/atoms";
import { Modal } from "@ui/molecules/Modal";
import { useState } from "react";
import { IconButton } from "@ui/atoms/BaseButton";
import { ETimeLimitDuration, IDaAs } from "@src/services/users/types";
import useSWR from "swr";
import {
  E_USERS_DAAS_UPDATE_USAGE,
  E_USERS_PROFILE,
} from "@src/services/users/endpoint";
import { http } from "@src/services/http";
import { TimeLimitDurationLabel } from "@src/constants/accessTime";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { ISwrResponse } from "@src/types/services";
import { AccessTimeModal } from "./AccessTimeModal";

export function AccessTime() {
  const [openModal, setOpenModal] = useState(false);
  useSWR(E_USERS_DAAS_UPDATE_USAGE, http.fetcherSWR, {
    refreshInterval: 60000,
  });

  const { data, mutate, isLoading } = useSWR<ISwrResponse<IDaAs>>(
    E_USERS_PROFILE,
    http.fetcherSWR,
    {
      refreshInterval: 60000,
    }
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const timeLimitDuration: ETimeLimitDuration =
    data?.data.time_limit_duration ?? ETimeLimitDuration.DAILY;

  const timeLimitValueInHour = data?.data.time_limit_value_in_hour ?? 0;

  const usageInMinute = data?.data.usage_in_minute ?? 0;

  return (
    <>
      <Card
        color="neutral"
        className="flex items-center justify-between w-64 px-2"
      >
        <Typography size="body3" color="teal">
          زمان دسترسی
        </Typography>
        <div className="flex items-center justify-between w-1/2">
          <Typography size="body3" color="neutral">
            {TimeLimitDurationLabel[timeLimitDuration]}
          </Typography>
          |
          <Typography size="body3" color="neutral">
            {timeLimitValueInHour} ساعت
          </Typography>
        </div>
        <IconButton
          icon="ph:hand-tap"
          onClick={() => {
            mutate();
            setOpenModal(true);
          }}
        />
      </Card>

      <Modal
        open={openModal}
        setOpen={setOpenModal}
        content={
          <AccessTimeModal
            onClick={setOpenModal}
            timeLimitDuration={timeLimitDuration}
            timeLimitValueInHour={timeLimitValueInHour}
            usageInMinute={Number(usageInMinute)}
          />
        }
        classContainer="border border-teal-600 w-[30rem]"
        type="none"
        freeSize
      />
    </>
  );
}
