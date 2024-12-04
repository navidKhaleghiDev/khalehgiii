import { dateAndNumber } from '@src/helper/utils/dateUtils';
import trashIcon from '@iconify-icons/ph/trash';
import notePencilIcon from '@iconify-icons/ph/note-pencil';
import { HeaderTableProps } from '@ui/atoms/BaseTable/types';
import { booleanIcon } from '@src/pages/Dashboard/DlpConfig/utils';
import { PermissionWhiteListFiles } from '@src/types/permissions';

export const dlpConfigHeaderItem: HeaderTableProps[] = [
  {
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: trashIcon,
        color: 'redNoBg',
        permission: PermissionWhiteListFiles.DELETE,
      },
      {
        action: 'edit',
        icon: notePencilIcon,
        color: 'neutralNoBg',
        permission: PermissionWhiteListFiles.CHANGE,
      },
    ],
    permission: [
      PermissionWhiteListFiles.CHANGE,
      PermissionWhiteListFiles.DELETE,
    ],

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.fileType',
    id: 'file_type',
    type: 'none',

    class: 'px-3 w-4/12',
  },
  {
    label: 'table.allowedForDownload',
    id: 'allowed_for_download',
    type: 'function',
    function: booleanIcon,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.allowedForUpload',
    id: 'allowed_for_upload',
    type: 'function',
    function: booleanIcon,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.active',
    id: 'is_active',
    type: 'function',
    function: booleanIcon,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'function',
    function: dateAndNumber,
    dir: 'rtl',
    class: 'px-3 w-2/12',
  },
];
