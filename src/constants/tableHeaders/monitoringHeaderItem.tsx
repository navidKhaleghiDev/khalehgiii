import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { CircleBg } from '@ui/atoms/CircleBg';
import { UserScanCount } from '@src/pages/DashboardMonitoring/UsersDaAsList/UserDaAsCard/UserScanCount';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { HeaderItem } from '@ui/atoms/BaseTable/BaseTableTypes';

export const monitoringHeaderItem: HeaderItem[] = [
  {
    label: 'table.observeUserBehavior',
    id: 'id',
    type: 'action',
    action: [
      {
        action: ROUTES_PATH.monitoring,
        icon: moreIcon,
        color: 'neutralNoBg',
        style: '',
      },
    ],
    dir: '',
    style: 'px-3 w-2/12',
  },
  {
    label: 'table.userName',
    id: 'email',
    type: 'none',
    dir: '',
    style: 'px-3 w-4/12',
    size: 'body4',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'function',
    function: dateAndNumber,
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.numberOfScans',
    id: 'last_uptime',
    type: 'component',
    component: (props: any) => <UserScanCount email={props.row.email} />,
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.userStatus',
    id: 'is_running',
    type: 'icon',
    icon: CircleBg,
    color: ['bg-green-600', 'bg-gray-400'],
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
];
