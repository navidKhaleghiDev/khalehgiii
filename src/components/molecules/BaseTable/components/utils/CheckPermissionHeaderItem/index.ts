import { HeaderTable } from '@ui/molecules/BaseTable/types';
import { PermissionsCodeName } from '@src/types/permissions';

export function checkPermissionHeaderItem(
  userPermissions: PermissionsCodeName[],
  headerItems: HeaderTable[]
): HeaderTable[] {
  // Filter header items based on user permissions
  const filteredHeaderItems = headerItems.filter((item: HeaderTable) => {
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

    if (item.type === 'action') {
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
