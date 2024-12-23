import { BaseSwitch } from '@ui/atoms/BaseSwitch';
import { DaAsParams } from '@src/services/users/types';
import { OnClickActionsType } from '../../types';

type LicenseFormProps = {
  name: string;
  value: any;
  onClick: OnClickActionsType<DaAsParams>;
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
      <BaseSwitch
        onChange={handleOnClick}
        name={name}
        checked={configs.is_recording}
        id={name}
      />
    </div>
  );
}
