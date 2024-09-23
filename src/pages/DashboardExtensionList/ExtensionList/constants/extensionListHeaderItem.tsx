import trashIcon from '@iconify-icons/ph/trash';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { EPermissionExtensions } from '@src/types/permissions';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';

export const extensionListHeaderItem: IHeaderTable[] = [
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
    type: 'tooltip',

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
    type: 'function',
    function: dateAndNumber,

    class: 'px-3 w-3/12',
  },
];
