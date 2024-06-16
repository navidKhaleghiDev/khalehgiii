import { BaseSwitchWithState } from '@ui/atoms/Inputs/BaseSwitchWithState';

type LicenseFormProps = {
  id: any;
  name: string;
  value: any;
  onClick: (data: any, id: string) => void;
};

export function BaseTableSwitch({
  id,
  name,
  onClick,
  value,
}: LicenseFormProps) {
  //
  const { daas_configs: configs } = value;

  const handleOnClick = (data: any) => {
    const updatedValue = {
      ...value,
      daas_configs: {
        ...configs,
        is_recording: data,
      },
    };

    onClick(updatedValue, id);
  };

  return (
    <div className="w-full h-full grid grid-cols-12 ">
      <BaseSwitchWithState
        pureOnChange={handleOnClick}
        name={name}
        pureValue={configs.is_recording}
      />
    </div>
  );
}
