import { useForm } from 'react-hook-form';

import { MultiDatePickerController } from '@ui/atoms/Inputs/DatePicker/Controller';
import { useLanguage } from '@context/settings/languageContext';

import { FormDate, ReportFormType } from '../../types';

export function ReportForm({ handleOnSubmit, state }: ReportFormType) {
  const { control, handleSubmit } = useForm<FormDate>({
    mode: 'onChange',
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  });

  const { isFarsi } = useLanguage();

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)}>
      <MultiDatePickerController
        timeDuration={state}
        control={control}
        id="start_date"
        name="start_date"
        format="YYYY-MM-DD"
        maxDate={new Date()}
        fullWidth
        calendarPosition={isFarsi ? 'bottom-right' : 'bottom-left'}
      />
    </form>
  );
}
