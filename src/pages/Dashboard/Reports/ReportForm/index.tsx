import { useTranslation } from 'react-i18next';
import { MultiDatePicker } from '@ui/atoms/Inputs/MultiDatePicker';
import { useForm } from 'react-hook-form';
import { IFormDate, IReportFormType } from '../types';

export function ReportForm({
  handleOnSubmit,
  state,
  onChange,
}: IReportFormType) {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IFormDate>({
    mode: 'onChange',
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  });

  // const todayDate = new Date();
  // todayDate.setDate(todayDate.getDate() + 1);

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <MultiDatePicker
        onChange={onChange}
        timeDuration={state}
        control={control}
        placeholder={t('global.periodOfTime')}
        id="start_date"
        name="start_date"
        format="YYYY-MM-DD"
        maxDate={new Date()}
        submitButton
        fullWidth
      />
    </form>
  );
}
