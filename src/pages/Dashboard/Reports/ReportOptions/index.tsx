import RadioButton from '@ui/atoms/RadioButton';
import { TypeReportOptions } from '../types';

export function ReportOptions({ state, dispatch }: TypeReportOptions) {
  return (
    <>
      <RadioButton
        onChange={() => dispatch({ type: 'NORMAL' })}
        value="normal"
        checked={!state.montly && !state.weekly}
        label="normal"
      />
      <RadioButton
        onChange={() => dispatch({ type: 'MONTH' })}
        value="month"
        checked={state.montly}
        label="month"
      />
      <RadioButton
        onChange={() => dispatch({ type: 'WEEK' })}
        value="week"
        checked={state.weekly}
        label="week"
      />
    </>
  );
}
