import { useCallback } from 'react';
import { BaseSwitch } from '@ui/atoms/Inputs/BaseSwitch';
import { useForm } from 'react-hook-form';

type LicenseFormProps = {
  id: any;
  name: any;
  onClick: (actions: any) => void;
};

export function LicenseStatusForm({ id, name, onClick }: LicenseFormProps) {
  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      is_recording: name,
      id,
    },
  });

  const handleOnSubmit = useCallback(
    (data: any) => {
      onClick(data);
    },
    [onClick]
  );

  return (
    <form
      className="w-full h-full grid grid-cols-12 "
      onSubmit={handleSubmit(handleOnSubmit)}
    >
      <BaseSwitch
        pureOnChange={() => handleOnSubmit(watch())}
        control={control}
        name="is_recording"
      />
    </form>
  );
}
