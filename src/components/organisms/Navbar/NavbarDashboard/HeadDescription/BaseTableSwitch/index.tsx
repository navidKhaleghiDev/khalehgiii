import { useCallback } from 'react';
import { BaseSwitch } from '@ui/atoms/Inputs/BaseSwitch';
import { useForm } from 'react-hook-form';

type LicenseFormProps = {
  id: any;
  name: string;
  value: boolean;
  onClick: (actions: any) => void;
};

export function BaseTableSwitch({
  id,
  name,
  onClick,
  value,
}: LicenseFormProps) {
  const { control, handleSubmit, watch } = useForm({
    mode: 'onChange',
    defaultValues: {
      is_recording: value,
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
        name={name}
      />
    </form>
  );
}
