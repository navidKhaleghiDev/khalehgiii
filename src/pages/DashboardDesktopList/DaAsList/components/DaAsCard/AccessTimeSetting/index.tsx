import { useEffect } from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import { ETimeLimitDuration } from '@src/services/users/types';
import { TimeLimitDurationLabel } from '@src/constants/accessTime';
import { Typography } from '@redesignUi/atoms';

interface IUpdateDaasValues extends FieldValues {
  time_limit_duration: ETimeLimitDuration;
  time_limit_value_in_hour?: number;
}

export const timeLimitDurationOptions = [
  {
    id: ETimeLimitDuration.DAILY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.DAILY],
    value: ETimeLimitDuration.DAILY,
  },
  {
    id: ETimeLimitDuration.WEEKLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.WEEKLY],
    value: ETimeLimitDuration.WEEKLY,
  },
  {
    id: ETimeLimitDuration.MONTHLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.MONTHLY],
    value: ETimeLimitDuration.MONTHLY,
  },
  {
    id: ETimeLimitDuration.PERMANENTLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.PERMANENTLY],
    value: ETimeLimitDuration.PERMANENTLY,
  },
  {
    id: ETimeLimitDuration.TEMPORARY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.TEMPORARY],
    value: ETimeLimitDuration.TEMPORARY,
  },
];

type PropsType = {
  timeLimitDuration: ETimeLimitDuration;
};

export function AccessTimeSetting({ timeLimitDuration }: PropsType) {
  const { reset } = useForm<IUpdateDaasValues>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (timeLimitDuration) {
      reset({
        time_limit_duration: timeLimitDuration,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Typography variant="body6" color="black">
      {TimeLimitDurationLabel[timeLimitDuration]}
    </Typography>
  );
}
