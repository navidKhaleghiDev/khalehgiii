import { useTranslation } from 'react-i18next';
import RadioButton from '@ui/atoms/RadioButton';
import { TypeReportOptions } from '../types';

export function ReportOptions({ state, dispatch, keys }: TypeReportOptions) {
  const { t } = useTranslation();
  return (
    <>
      <RadioButton
        onChange={() => dispatch({ type: keys.DIS_KEY_NORMAL })}
        value="normal"
        checked={!state.montly && !state.weekly}
        label={t('global.normalSelect')}
      />
      <RadioButton
        onChange={() => dispatch({ type: keys.DIS_KEY_MONTH })}
        value="month"
        checked={state.montly}
        label={t('global.monthlySelect')}
      />
      <RadioButton
        onChange={() => dispatch({ type: keys.DIS_KEY_WEEK })}
        value="week"
        checked={state.weekly}
        label={t('global.weeklySelect')}
      />
    </>
  );
}
