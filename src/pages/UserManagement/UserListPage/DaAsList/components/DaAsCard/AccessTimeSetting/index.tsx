import { useEffect } from 'react';

import { FieldValues, useForm } from 'react-hook-form';

import { TimeLimitDuration } from '@src/services/users/types';
import { TimeLimitDurationLabel } from '@src/constants/accessTime';
import { Typography } from '@ui/atoms';

interface UpdateDaasValues extends FieldValues {
  time_limit_duration: TimeLimitDuration;
  time_limit_value_in_hour?: number;
}

export const timeLimitDurationOptions = [
  {
    id: TimeLimitDuration.DAILY,
    label: TimeLimitDurationLabel[TimeLimitDuration.DAILY],
    value: TimeLimitDuration.DAILY,
  },
  {
    id: TimeLimitDuration.WEEKLY,
    label: TimeLimitDurationLabel[TimeLimitDuration.WEEKLY],
    value: TimeLimitDuration.WEEKLY,
  },
  {
    id: TimeLimitDuration.MONTHLY,
    label: TimeLimitDurationLabel[TimeLimitDuration.MONTHLY],
    value: TimeLimitDuration.MONTHLY,
  },
  {
    id: TimeLimitDuration.PERMANENTLY,
    label: TimeLimitDurationLabel[TimeLimitDuration.PERMANENTLY],
    value: TimeLimitDuration.PERMANENTLY,
  },
  {
    id: TimeLimitDuration.TEMPORARY,
    label: TimeLimitDurationLabel[TimeLimitDuration.TEMPORARY],
    value: TimeLimitDuration.TEMPORARY,
  },
];

type PropsType = {
  timeLimitDuration: TimeLimitDuration;
};

export function AccessTimeSetting({ timeLimitDuration }: PropsType) {
  const { reset } = useForm<UpdateDaasValues>({
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
