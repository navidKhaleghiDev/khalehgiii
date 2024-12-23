import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@ui/atoms';
import { BaseRadioButtonController } from '@ui/atoms/Inputs/BaseRadioButton/Controller';
import { TimeLimitDuration } from '@src/services/users/types';

import { UserAccessModalCard } from '../DaAsCard/UserAccessModalCard';

type TimeOfUseAccessProps = {
  control: Control<any>;
};

export function TimeOfUseAccess(props: TimeOfUseAccessProps): JSX.Element {
  const { control } = props;
  const { t } = useTranslation();
  return (
    <UserAccessModalCard>
      <div className="rtl:text-right ltr:text-left mb-4">
        <Typography variant="body5B" color="neutralDark">
          {t('userList.timeOfUse')}
        </Typography>
        <Typography variant="body6" color="neutral">
          {t('userList.specifyTheTimeToUseTheSystem')}
        </Typography>
      </div>
      <div className="flex justify-start gap-5 flex-wrap">
        <BaseRadioButtonController
          name="time_limit_duration"
          control={control}
          id="time_limit_duration_daily"
          value={TimeLimitDuration.DAILY}
          label={t('global.dailySelect')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
        <BaseRadioButtonController
          name="time_limit_duration"
          control={control}
          id="time_limit_duration_weekly"
          value={TimeLimitDuration.WEEKLY}
          label={t('global.weeklySelect')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
        <BaseRadioButtonController
          name="time_limit_duration"
          control={control}
          id="time_limit_duration_monthly"
          value={TimeLimitDuration.MONTHLY}
          label={t('global.monthlySelect')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
        <BaseRadioButtonController
          name="time_limit_duration"
          control={control}
          id="time_limit_duration_permanently"
          value={TimeLimitDuration.PERMANENTLY}
          label={t('table.permanent')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
      </div>
    </UserAccessModalCard>
  );
}
