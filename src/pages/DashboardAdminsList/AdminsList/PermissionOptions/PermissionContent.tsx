import { useState } from 'react';

import { BaseCheckBox } from '@redesignUi/atoms/Inputs/BaseCheckBox';
import { BaseCollapse } from '@redesignUi/atoms/BaseCollapse';
import { SearchInput } from '@redesignUi/atoms/Inputs/SearchInput';

import { accessMock, ContentType } from './dataMock';

export function PermissionContent() {
  const [permissionsData, setPermissionsData] =
    useState<ContentType[]>(accessMock);
  const [searchItem, setSearchItem] = useState<string>('');

  const handlePermissionChange = (
    contentType: string,
    permissionId: number
  ) => {
    const updatedPermissions = permissionsData.map((group) => {
      if (group.content_type === contentType) {
        return {
          ...group,
          permissions: group.permissions.map((permission) =>
            permission.id === permissionId
              ? { ...permission, selected: !permission.selected }
              : permission
          ),
        };
      }
      return group;
    });

    setPermissionsData(updatedPermissions);
  };

  const handleSelectAll = (contentType: string) => {
    const updatedPermissions = permissionsData.map((group) => {
      if (group.content_type === contentType) {
        const allSelected = group.permissions.every((perm) => perm.selected);
        return {
          ...group,
          permissions: group.permissions.map((perm) => ({
            ...perm,
            selected: !allSelected,
          })),
        };
      }
      return group;
    });

    setPermissionsData(updatedPermissions);
  };

  const filteredPermissionsData = permissionsData.filter((group) =>
    group.content_type.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="h-[30.37rem] overflow-y-auto">
      <SearchInput
        id="search"
        name="search"
        onChange={(e) => setSearchItem(e)}
        value={searchItem}
        placeholder="جستجو دسترسی"
      />
      {filteredPermissionsData.map((group) => (
        <BaseCollapse
          className="mt-1"
          key={group.content_type}
          title={group.content_type}
          content={
            <div className="flex h-10 justify-between items-center w-full">
              <BaseCheckBox
                id={`${group.content_type}_all`}
                name="all"
                onChange={() => handleSelectAll(group.content_type)}
                checked={group.permissions.every((item) => item.selected)}
                label="All"
                size="sm"
              />
              <div className="flex gap-5">
                {group.permissions.map((item) => (
                  <BaseCheckBox
                    key={item.id}
                    id={item.codename}
                    name={item.codename}
                    onChange={() =>
                      handlePermissionChange(group.content_type, item.id)
                    }
                    checked={item.selected}
                    label={`${item.name
                      .replace(group.content_type, '')
                      .trim()}`}
                    size="sm"
                  />
                ))}
              </div>
            </div>
          }
        />
      ))}
    </div>
  );
}
