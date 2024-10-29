import trashIcon from '@iconify-icons/ph/trash';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { EPermissionExtensions } from '@src/types/permissions';

export const extensionListHeaderItem: HeaderTable[] = [
  {
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: trashIcon,
        color: 'redNoBg',
      },
    ],
    permission: EPermissionExtensions.DELETE,

    class: 'px-3 w-3/12',
  },
  {
    label: 'table.string',
    id: 'mimetype_list',
    type: 'none',

    class: 'px-3 w-4/12',
  },
  {
    label: 'table.fileExtension',
    id: 'extension_list',
    type: 'none',

    class: 'px-3 w-3/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'component',
    function: dateAndNumber,

    class: 'px-3 w-3/12',
  },
];
