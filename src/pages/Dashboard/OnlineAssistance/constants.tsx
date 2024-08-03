import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { UserScanCount } from '@ui/atoms/BaseTable/components/utils/UserScanCount';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import trashIcon from '@iconify-icons/ph/trash';

import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { EPermissionFileScan } from '@src/types/permissions';

export const onlineAssistanceHeaderItem: IHeaderTable[] = [
  {
    label: 'header.admin',
    id: 'admin',
    type: 'none',
    class: 'px-3 w-4/12',
  },
  {
    label: 'header.user',
    id: 'user',
    type: 'none',
    class: 'px-3 w-2/12',
  },
  {
    label: 'groupManagement.group',
    id: 'group_name',
    type: 'none',
    class: 'px-3 w-2/12',
  },
  {
    label: 'global.videoDuration',
    id: 'duration_time',
    type: 'none',
    class: 'px-3 w-2/12',
  },
  {
    label: 'global.recordDate',
    id: 'created_at',
    type: 'none',
    class: 'px-3 w-2/12',
  },
  {
    label: '',
    id: 'playVideo',
    class: 'px-3 w-2/12',
    type: 'component',
    component: (props: any) => <UserScanCount email={props.row.email} />,
  },
  {
    label: '',
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: trashIcon,
        color: 'redNoBg',
        tooltip: 'table.delete',
        // permission: EPermissionFileScan.DELETE,
      },
    ],
    permission: EPermissionFileScan.VIEW,

    class: 'px-3 w-2/12',
  },
];
