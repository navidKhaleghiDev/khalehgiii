import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseCheckBox } from '@ui/atoms/Inputs/BaseCheckBox';
import { BaseCollapse } from '@ui/atoms/BaseCollapse';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import { UserPermissionsProps } from '@src/types/permissions';

import { PermissionOptionsProps } from './types';

interface GroupedPermissions {
  [groupTitle: string]: UserPermissionsProps[];
}

export function PermissionOptions({
  loading,
  permissions,
  setSelectedPermissions,
  selectedPermissions,
}: PermissionOptionsProps) {
  const { t } = useTranslation();
  const [searchItem, setSearchItem] = useState<string>('');
  const [localSelectedPermissions, setLocalSelectedPermissions] = useState<
    UserPermissionsProps[]
  >([]);
  const [openCollapse, setOpenCollapse] = useState<string | null>(null);

  useEffect(() => {
    setLocalSelectedPermissions(selectedPermissions);
  }, [selectedPermissions]);

  function convertItemAccess(codename: string) {
    const itemAccess = codename
      .split('_')
      .slice(0, 1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    return itemAccess;
  }

  function getGroupTitle(codename: string) {
    const actionRemoved = codename.split(' ').slice(2).join(' ');
    return actionRemoved
      .split('_')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }

  const filteredPermissionsData = permissions.filter((group) =>
    getGroupTitle(group.name).toLowerCase().includes(searchItem.toLowerCase())
  );

  const groupedData = filteredPermissionsData.reduce(
    (acc: GroupedPermissions, item) => {
      const groupTitle = getGroupTitle(item.name);
      if (!acc[groupTitle]) acc[groupTitle] = [];
      acc[groupTitle].push(item);
      return acc;
    },
    {}
  );

  const handleSelectAll = (groupTitle: string, isSelected: boolean) => {
    const updatedPermissions = isSelected
      ? [...localSelectedPermissions, ...groupedData[groupTitle]]
      : localSelectedPermissions.filter(
          (perm) => !groupedData[groupTitle].some((item) => item.id === perm.id)
        );

    setLocalSelectedPermissions(updatedPermissions);
    setSelectedPermissions(updatedPermissions);
  };

  const handleSelectPermission = (permission: UserPermissionsProps) => {
    const updatedPermissions = localSelectedPermissions.some(
      (perm) => perm.id === permission.id
    )
      ? localSelectedPermissions.filter((perm) => perm.id !== permission.id)
      : [...localSelectedPermissions, permission];

    setLocalSelectedPermissions(updatedPermissions);
    setSelectedPermissions(updatedPermissions);
  };

  const handleToggleGroup = (groupTitle: string) => {
    setOpenCollapse((prevOpenGroup) =>
      prevOpenGroup === groupTitle ? null : groupTitle
    );
  };

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="h-[30.37rem] overflow-y-auto ltr:pr-5 rtl:pl-5">
          <SearchInput
            id="search"
            name="search"
            onChange={(value) => setSearchItem(value)}
            value={searchItem}
            placeholder={t('table.search')}
          />
          {filteredPermissionsData.length === 0 ? (
            <NoResult />
          ) : (
            Object.entries(groupedData).map(([groupTitle, items]) => {
              const allSelected = items.every((item) =>
                localSelectedPermissions.some((perm) => perm.id === item.id)
              );
              return (
                <BaseCollapse
                  className="mt-1"
                  key={groupTitle}
                  title={groupTitle}
                  isOpen={openCollapse === groupTitle}
                  onToggle={() => handleToggleGroup(groupTitle)}
                  content={
                    <div className="flex sm:flex-row flex-col sm:h-10 h-[3.87rem] sm:justify-between justify-center sm:items-center w-full gap-2.5">
                      <BaseCheckBox
                        id={`all_${groupTitle}`}
                        name="all"
                        onChange={() =>
                          handleSelectAll(groupTitle, !allSelected)
                        }
                        checked={allSelected}
                        label={t('global.all')}
                        size="sm"
                      />
                      <div className="self-end sm:self-auto flex sm:gap-5 gap-2">
                        {items.map((item) => (
                          <BaseCheckBox
                            key={item.id}
                            id={item.codename}
                            name={item.codename}
                            onChange={() => handleSelectPermission(item)}
                            checked={localSelectedPermissions.some(
                              (perm) => perm.id === item.id
                            )}
                            label={convertItemAccess(item.codename)}
                            size="sm"
                          />
                        ))}
                      </div>
                    </div>
                  }
                />
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
