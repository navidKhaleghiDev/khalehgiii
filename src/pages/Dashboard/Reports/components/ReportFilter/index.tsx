import { useTranslation } from 'react-i18next';

import { Card } from '@redesignUi/atoms';
import { ToggleButton } from '@redesignUi/atoms/ToggleButton/ToggleButton';
import { ButtonOption } from '@redesignUi/atoms/ToggleButton/types';

import { FormDateData, ReducerStateType } from '../../types';
import { ReportForm } from '../../ReportForm';

type ReportFilterProps = {
  flag: string;
  handleOnSubmit: (data: FormDateData) => Promise<void>;
  handleToggleButton: (selected: ButtonOption) => void;
  state: ReducerStateType;
};

export function ReportFilter({
  flag,
  handleOnSubmit,
  handleToggleButton,
  state,
}: ReportFilterProps) {
  const { t } = useTranslation();

  return (
    <Card
      className="w-full flex sm:items-center items-start justify-between"
      color="none"
    >
      <div className="flex items-center justify-between sm:gap-[1.875rem] gap-2.5">
        <ReportForm handleOnSubmit={handleOnSubmit} state={state} />
        {/* This functionality does not work cause we do not have the service */}
        {/* <BaseButton
          label={t('global.domain')}
          endIcon={caretLeft}
          size="sm"
          type="neutral"
          className="sm:flex hidden"
          disabled // This button is disabled until the backend provides data for the domain
        />
        <IconButton
          icon={GlobeSimple}
          color="neutral"
          size="sm"
          className="sm:hidden flex"
        /> */}
      </div>
      <div className="flex gap-2.5 items-end justify-end">
        <ToggleButton
          buttonOptions={[
            {
              id: 1,
              label: t('table.monthly'),
              value: 'monthly',
              active: flag === 'monthly',
            },
            {
              id: 2,
              label: t('table.weekly'),
              value: 'weekly',
              active: flag === 'weekly',
            },
            {
              id: 3,
              label: t('table.daily'),
              value: 'daily',
              active: flag === 'daily',
            },
          ]}
          onChange={handleToggleButton}
          size="responsive"
        />
      </div>
    </Card>
  );
}
