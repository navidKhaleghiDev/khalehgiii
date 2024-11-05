import { dateAndNumber } from '@src/helper/utils/dateUtils';

import { booleanIcon } from '@src/pages/Dashboard/DlpConfig/utils';
import {
  EPermissionUsers,
  EPermissionWhiteListFiles,
} from '@src/types/permissions';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import Trash from '@iconify-icons/ph/trash-simple';
import NotePencil from '@iconify-icons/ph/pencil-simple';
import { IconFile } from '@src/pages/Setting/DlpSetting/component/IconType';

export const dlpConfigHeaderItem: HeaderTable[] = [
  {
    label: 'table.fileType',
    id: 'file_type',
    component: (props: any) => <IconFile fileType={props.row.file_type} />,
    type: 'component',
    class: 'px-3 w-4/12 md:w-2/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'date',
    isMobileCollapsed: true,
    function: dateAndNumber,
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },

  {
    label: 'table.active',
    id: 'is_active',
    type: 'component',
    isMobileCollapsed: true,
    function: booleanIcon,

    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.permissions',
    id: ['allowed_for_download', 'allowed_for_upload'],
    type: 'component',
    isMobileCollapsed: true,
    function: booleanIcon,
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },

  // {
  //   label: 'table.allowedForUpload',
  //   id: 'allowed_for_upload',
  //   type: 'component',
  //   function: booleanIcon,

  //   class: 'px-3 w-2/12',
  // },

  {
    id: 'action',
    type: 'menu',
    tooltip: 'table.moreDetail',
    menu: [
      {
        action: 'edit',
        icon: NotePencil,
        color: 'neutralNoBg',
        permission: EPermissionUsers.CHANGE,
        title: 'table.editAdminInfo',
      },
      {
        action: 'delete',
        icon: Trash,
        color: 'redNoBg',
        permission: EPermissionUsers.DELETE,
        title: 'table.deleteAdmin',
      },
    ],

    permission: [
      EPermissionWhiteListFiles.CHANGE,
      EPermissionWhiteListFiles.DELETE,
    ],

    class: 'px-3 w-7/12',
  },
];
