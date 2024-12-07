import { PermissionsCodeName } from '@src/types/permissions';
import { HeaderTableProps } from '@ui/atoms/BaseTable/types';

export function checkPermissionHeaderItem(
  userPermissions: PermissionsCodeName[],
  headerItems: HeaderTableProps[]
): HeaderTableProps[] {
  // Filter header items based on user permissions
  const filteredHeaderItems = headerItems.filter((item: HeaderTableProps) => {
    // Check if the item itself requires a permission
    if (Array.isArray(item.permission)) {
      if (
        !item.permission.some((permission) =>
          userPermissions.includes(permission)
        )
      ) {
        return false;
      }
    } else if (item.permission && !userPermissions.includes(item.permission)) {
      return false;
    }

    // Check if the item has actions that require permissions
    if (item.action) {
      // eslint-disable-next-line no-param-reassign
      item.action = item.action.filter(
        (actionItem: any) =>
          !actionItem.permission ||
          userPermissions.includes(actionItem.permission)
      );

      // If no actions are left after filtering, exclude this item
      if (item.action.length === 0) {
        return false;
      }
    }

    return true;
  });

  return filteredHeaderItems;
}
