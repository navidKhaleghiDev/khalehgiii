import { IDaAs } from '@src/services/users/types';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { BaseSwitchWithState } from '@ui/atoms/Inputs/BaseSwitchWithState';

type LicenseFormProps = {
  name: string;
  value: any;
  onClick: OnClickActionsType<IDaAs>;
};

export function BaseTableSwitch({ name, onClick, value }: LicenseFormProps) {
  const { daas_configs: configs } = value;

  const handleOnClick = (data: any) => {
    const updatedValue = {
      ...value,
      daas_configs: {
        ...configs,
        is_recording: data,
      },
    };

    onClick('edit', updatedValue);
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
