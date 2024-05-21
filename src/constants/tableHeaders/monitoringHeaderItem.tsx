import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { UserScanCount } from '@ui/atoms/BaseTable/components/utils/UserScanCount';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';

export const monitoringHeaderItem: IHeaderTable[] = [
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
        action: ROUTES_PATH.monitoring,
        icon: moreIcon,
        color: 'neutralNoBg',
        tooltip: 'table.observeUserBehavior',
      },
    ],

    class: 'px-3 w-2/12',
  },
];
