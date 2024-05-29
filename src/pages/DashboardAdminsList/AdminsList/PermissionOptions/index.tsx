import { useEffect, useState } from 'react';
import { permissionKeys } from '@src/constants/permissionKeys';
import { Typography } from '@ui/atoms';
import { BaseSwitchWithState } from '@ui/atoms/Inputs/BaseSwitchWithState';
import { IUserPermissions } from '@src/types/permissions';
import { IPermissionOptionsProps } from './types';

export function PermissionOptions({
  permissions,
  setSelectedSwitches,
  selectedSwitches,
}: IPermissionOptionsProps) {
  const [mergedPermissions, setMergedPermissions] = useState<
    IUserPermissions[]
  >([]);

  const handleSwitchChange = (item: IUserPermissions, isChecked: boolean) => {
    if (isChecked) {
      setSelectedSwitches((prev: IUserPermissions[] | []) => [...prev, item]);
    } else {
      setSelectedSwitches((prev: IUserPermissions[] | []) =>
        prev.filter((i: IUserPermissions) => i.id !== item.id)
      );
    }
  };

  useEffect(() => {
    // Filter and merge permissions with selected switches
    const filteredPermissions = permissions.filter((item) =>
      permissionKeys.includes(item.codename)
    );
    const updatedPermissions = filteredPermissions.map((item) => ({
      ...item,
      selected: selectedSwitches.some(
        (selected: any) => selected.id === item.id
      ),
    }));

    setMergedPermissions(updatedPermissions);
  }, [permissions, selectedSwitches]);

  return (
    <div
      dir="ltr"
      className="px-2 col-span-6 flex justify-center items-center w-full mb-4 p-2  h-auto flex-wrap "
    >
      {mergedPermissions.map((item) => (
        <div key={item.id} className="w-2/6 flex-col justify-center ">
          <div className="w-6/6 flex justify-between items-center mt-2">
            <Typography className="mb-1" type="h4" color="teal">
              {item.name}
            </Typography>
            <BaseSwitchWithState
              pureOnChange={(isChecked) => handleSwitchChange(item, isChecked)}
              pureValue={item.selected}
              name={item.codename}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
