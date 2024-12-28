import { t } from 'i18next';

import { Card } from '@ui/atoms';
import { BaseRadioButtonController } from '@ui/atoms/Inputs/BaseRadioButton/Controller';
import { PropsType } from '@src/pages/Setting/type';

export function TimeLimitation({ isActive, control }: PropsType) {
  const cardStyles =
    'flex items-center w-40 sm:w-full h-10 shrink-0 pr-[0.62rem] ltr:pl-[0.62rem] col-span-6 md:col-span-3 lg:col-span-2';
  return (
    <div className="w-full mb-5">
      <div className="gap-5 grid-flow-row-dense grid grid-cols-12">
        <Card
          className={`${cardStyles} ${
            isActive === 'DAILY' ? 'border border-teal-500' : ''
          }`}
          color="white"
        >
          <BaseRadioButtonController
            control={control}
            id="daily"
            name="time_limit_duration"
            value="DAILY"
            label={t('table.daily')}
          />
        </Card>
        <Card
          className={`${cardStyles} ${
            isActive === 'WEEKLY' ? 'border border-teal-500' : ''
          }`}
          color="white"
        >
          <BaseRadioButtonController
            control={control}
            id="weekly"
            name="time_limit_duration"
            value="WEEKLY"
            label={t('table.weekly')}
          />
        </Card>
        <Card
          className={`${cardStyles} ${
            isActive === 'MONTHLY' ? 'border border-teal-500' : ''
          }`}
          color="white"
        >
          <BaseRadioButtonController
            control={control}
            id="monthly"
            name="time_limit_duration"
            value="MONTHLY"
            label={t('table.monthly')}
          />
        </Card>
        <Card
          className={`${cardStyles} ${
            isActive === 'PERMANENTLY' ? 'border border-teal-500' : ''
          }`}
          color="white"
        >
          <BaseRadioButtonController
            control={control}
            id="permanently"
            name="time_limit_duration"
            value="PERMANENTLY"
            label={t('table.permanently')}
            className="col--6 lg:col-span-4"
          />
        </Card>
      </div>
    </div>
  );
}
