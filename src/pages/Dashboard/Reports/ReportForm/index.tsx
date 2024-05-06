import { useTranslation } from 'react-i18next';
import { MultiDatePicker } from '@ui/atoms/Inputs/MultiDatePicker';
import { useForm } from 'react-hook-form';
import { IFormDate, IReportFormType } from '../types';

export function ReportForm({
  handleOnSubmit,
  state,
  onClick,
}: IReportFormType) {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IFormDate>({
    mode: 'onChange',
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  });

  const todayDate = new Date();
  todayDate.setDate(todayDate.getDate() + 1);

  return (
    <form className="" onSubmit={handleSubmit(handleOnSubmit)}>
      <MultiDatePicker
        onClick={onClick}
        timeDuration={state}
        control={control}
        placeholder={t('global.periodOfTime')}
        id="start_date"
        name="start_date"
        format="YYYY-MM-DD"
        maxDate={todayDate}
        submitButton
        fullWidth
      />
    </form>
  );
}
