import { useForm } from 'react-hook-form';

import { MultiDatePickerController } from '@redesignUi/atoms/Inputs/DatePicker/Controller';

import { IFormDate, IReportFormType } from '../types';

export function ReportForm({ handleOnSubmit, state }: IReportFormType) {
  const { control, handleSubmit } = useForm<IFormDate>({
    mode: 'onChange',
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  });

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
      />
    </form>
  );
}
