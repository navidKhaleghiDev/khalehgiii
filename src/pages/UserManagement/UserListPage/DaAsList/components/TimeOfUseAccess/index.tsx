import { Control } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { BaseRadioButtonController } from '@redesignUi/atoms/Inputs/BaseRadioButton/Controller';
import { ETimeLimitDuration } from '@src/services/users/types';

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
          value={ETimeLimitDuration.DAILY}
          label={t('global.dailySelect')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
        <BaseRadioButtonController
          name="time_limit_duration"
          control={control}
          id="time_limit_duration_weekly"
          value={ETimeLimitDuration.WEEKLY}
          label={t('global.weeklySelect')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
        <BaseRadioButtonController
          name="time_limit_duration"
          control={control}
          id="time_limit_duration_monthly"
          value={ETimeLimitDuration.MONTHLY}
          label={t('global.monthlySelect')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
        <BaseRadioButtonController
          name="time_limit_duration"
          control={control}
          id="time_limit_duration_permanently"
          value={ETimeLimitDuration.PERMANENTLY}
          label={t('table.permanent')}
          className="shadow p-2.5 flex gap-2 rounded-xl dark:bg-gray-600 dark:shadow-none"
        />
      </div>
    </UserAccessModalCard>
  );
}