import { useTranslation } from 'react-i18next';
import { BaseButton } from '@ui/atoms';
import { TypeReportOptions } from '../types';

export function ReportOptions({ state, dispatch, keys }: TypeReportOptions) {
  const { t } = useTranslation();
  return (
    <>
      <BaseButton
        size="lg"
        label={t('global.arbitrary')}
        type={!state.monthly && !state.weekly ? 'default' : 'shadow'}
        onClick={() => dispatch({ type: keys.DIS_KEY_NORMAL })}
      />
      <BaseButton
        size="lg"
        label={t('global.weeklySelect')}
        type={state.weekly ? 'default' : 'shadow'}
        onClick={() => dispatch({ type: keys.DIS_KEY_WEEK })}
      />
      <BaseButton
        size="lg"
        label={t('global.monthlySelect')}
        type={state.monthly ? 'default' : 'shadow'}
        onClick={() => dispatch({ type: keys.DIS_KEY_MONTH })}
      />
    </>
  );
}
