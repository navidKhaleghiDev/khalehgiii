import { useTranslation } from 'react-i18next';
import { MultiDatePicker } from '@ui/atoms/Inputs/MultiDatePicker';
import { useForm } from 'react-hook-form';
import { IFormDate, IReportFormType } from '../types';

export function ReportForm({ handleOnSubmit, state }: IReportFormType) {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IFormDate>({
    mode: 'onChange',
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  });

  return (
    <form className="" onSubmit={handleSubmit(handleOnSubmit)}>
      <MultiDatePicker
        timeDuration={state}
        control={control}
        placeholder={t('global.selectDate')}
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
