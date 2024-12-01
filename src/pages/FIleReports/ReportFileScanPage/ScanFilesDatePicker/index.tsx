import { useForm } from 'react-hook-form';

import { MultiDatePickerController } from '@redesignUi/atoms/Inputs/DatePicker/Controller';
import { convertI2ToAD } from '@redesignUi/atoms/Inputs/utils';
import { useLanguage } from '@context/settings/languageContext';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

export type DateFormat = {
  start_date: string | string[] | undefined;
  end_date: string | string[] | undefined;
};

export function ScanFileDatePicker({
  onChange,
}: {
  onChange: (value: DateFormat) => void;
}) {
  const { control, handleSubmit } = useForm<any>({
    mode: 'onChange',
    defaultValues: {
      start_date: '',
      end_date: '',
    },
  });
  const { dir } = useLanguage();
  const { height } = useWindowDimensions();

  const myCalenderPositionLandScape = dir === 'rtl' ? 'right' : 'left';
  const myCalenderPositionNormal =
    dir === 'rtl' ? 'bottom-end' : 'bottom-start';

  const overall =
    height <= 400 ? myCalenderPositionLandScape : myCalenderPositionNormal;

  const handelDateForm = (date: any) => {
    const updatedData = {
      start_date: convertI2ToAD(date.start_date[0]),
      end_date: convertI2ToAD(date.start_date[1]),
    };

    onChange(updatedData);
  };

  return (
    <form onSubmit={handleSubmit(handelDateForm)} className="text-start my-5">
      <MultiDatePickerController
        control={control}
        id="start_date"
        name="start_date"
        format="YYYY-MM-DD"
        maxDate={new Date()}
        fullWidth
        calendarPosition={overall}
      />
    </form>
  );
}
