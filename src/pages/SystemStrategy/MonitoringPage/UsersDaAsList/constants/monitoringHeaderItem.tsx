import { dateAndNumber } from '@src/helper/utils/dateUtils';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { HeaderTableProps } from '@ui/atoms/OldBaseTable/types';
import { UserScanCount } from '@ui/atoms/OldBaseTable/components/utils/UserScanCount';
import { Circle } from '@ui/atoms/OldBaseTable/components/tableIcons/Circle';
import { PermissionFileScan } from '@src/types/permissions';

export const monitoringHeaderItem: HeaderTableProps[] = [
  {
    label: 'table.userName',
    id: 'email',
    type: 'none',

    class: 'px-3 w-4/12',
  },

  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'function',
    function: dateAndNumber,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.numberOfScans',
    id: 'last_uptime',
    type: 'component',
    component: (props: any) => <UserScanCount email={props.row.email} />,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.userStatus',
    id: 'is_running',
    type: 'component',
    component: (props: any) => <Circle id={props.row.is_running} />,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.observeUserBehavior',
    id: 'id',
    type: 'action',
    action: [
      {
        action: ROUTES_PATH.reportsScanFile,
        icon: moreIcon,
        color: 'neutralNoBg',
        tooltip: 'table.observeUserBehavior',
      },
    ],
    permission: PermissionFileScan.VIEW,

    class: 'px-3 w-2/12',
  },
];
