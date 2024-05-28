import { permissionKeys } from '@src/constants/permissionKeys';
import { Typography } from '@ui/atoms';
import { BaseSwitchWithState } from '@ui/atoms/Inputs/BaseSwitchWithState';
import { IUserPermissions } from '@src/types/permissions';
import { IPermissionOptionsProps } from './types';

export function PermissionOptions({
  permissions,
  setSelectedSwitches,
  selectedSwiches,
}: IPermissionOptionsProps) {
  const filterdPermissions = permissions.filter((item) =>
    permissionKeys.includes(item.codename)
  );
  const handleSwitchChange = (item: IUserPermissions, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSwitches((prev: number[] | []) => [...prev, item.id]);
    } else {
      setSelectedSwitches((prev: number[] | []) =>
        prev.filter((i: number) => i !== item.id)
      );
    }
  };

  return (
    <div
      dir="ltr"
      className="px-2 col-span-6 flex justify-center items-center w-full mb-4 border border-gray-500 rounded-md p-2  h-auto flex-wrap "
    >
      {filterdPermissions.map((item) => (
        <div key={item.id} className="w-2/6 flex-col justify-center ">
          <div className="w-6/6 flex justify-between items-center mt-2">
            <Typography className="mb-1" type="h4" color="teal">
              {item.name}
            </Typography>
            <BaseSwitchWithState
              pureOnChange={(isChecked) => handleSwitchChange(item, isChecked)}
              pureValue={selectedSwiches.some((i) => i === item.id)}
              name={item.codename}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
