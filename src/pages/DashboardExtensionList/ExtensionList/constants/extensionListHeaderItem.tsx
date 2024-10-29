import PhTrashSimple from '@iconify-icons/ph/trash-simple';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { EPermissionExtensions } from '@src/types/permissions';

export const extensionListHeaderItem: HeaderTable[] = [
  {
    label: 'table.fileExtension',
    id: 'extension_list',
    type: 'none',
    class: 'px-3 w-3/12 lg:w-2/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'date',
    class: 'px-4 lg:px-3 w-2/12 lg:w-1/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.string',
    id: 'mimetype_list',
    type: 'none',
    class: 'lg:px-3 w-2/12 lg:w-1/12',
    isMobileCollapsed: true,
  },
  {
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: PhTrashSimple,
        color: 'redNoBg',
      },
    ],
    permission: EPermissionExtensions.DELETE,
    class: 'sm:px-12 w-1/12 mr-auto',
  },
];
