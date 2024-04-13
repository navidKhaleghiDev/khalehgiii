import { useTranslation } from 'react-i18next';
import RadioButton from '@ui/atoms/RadioButton';
import { TypeReportOptions } from '../types';

export function ReportOptions({ state, dispatch }: TypeReportOptions) {
  const { t } = useTranslation();
  return (
    <>
      <RadioButton
        onChange={() => dispatch({ type: 'NORMAL' })}
        value="normal"
        checked={!state.montly && !state.weekly}
        label={t('global.normalSelect')}
      />
      <RadioButton
        onChange={() => dispatch({ type: 'MONTH' })}
        value="month"
        checked={state.montly}
        label={t('global.monthlySelect')}
      />
      <RadioButton
        onChange={() => dispatch({ type: 'WEEK' })}
        value="week"
        checked={state.weekly}
        label={t('global.weeklySelect')}
      />
    </>
  );
}
