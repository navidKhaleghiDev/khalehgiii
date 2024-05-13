import { useCallback, useEffect } from 'react';
import { BaseSwitch } from '@ui/atoms/Inputs/BaseSwitch';
import { useForm } from 'react-hook-form';

type LicenseFormProps = {
  id: any;
  name: any;
  onClick: (actions: any) => void;
};

export function LicenseStatusForm({ id, name, onClick }: LicenseFormProps) {
  const { control, handleSubmit, formState, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      is_recording: name,
      id,
    },
  });

  const handleOnSubmit = useCallback((data: any) => {
    console.log('handleClick');
    onClick(data);
  }, []);

  useEffect(() => {
    console.log('run');
    handleOnSubmit(watch());
  }, [formState.defaultValues?.is_recording, handleOnSubmit, name, watch]);

  console.log(formState.defaultValues?.is_recording !== watch('is_recording'));

  return (
    <form
      className="w-full h-full grid grid-cols-12 "
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <BaseSwitch
        pureOnChange={() => console.log('onchange')}
        control={control}
        name="is_recording"
      />
    </form>
  );
}
