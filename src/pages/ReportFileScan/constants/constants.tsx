import { UserScanCount } from '@ui/atoms/BaseTable/components/utils/UserScanCount';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { EPermissionFileScan } from '@src/types/permissions';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';

export const monitoringHeaderItem: IHeaderTable[] = [
  {
    label: 'table.userName',
    id: 'email',
    type: 'none',

    class: 'px-3 w-1/12',
  },

  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'date',

    class: 'px-3 w-1/12',
  },
  {
    label: 'table.numberOfScans',
    id: 'last_uptime',
    type: 'component',
    component: (props: any) => <UserScanCount email={props.row.email} />,

    class: 'px-3 w-1/12',
  },
  {
    label: 'table.userStatus',
    id: 'is_running',
    type: 'component',
    component: (props: any) => <Circle id={props.row.is_running} />,

    class: 'px-3 w-1/12',
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
    permission: EPermissionFileScan.VIEW,

    class: 'px-3 w-1/12 flex justify-center  mr-auto ',
  },
];

export const domainsMock: OptionSelect[] = [
  {
    id: 1,
    label: 'sep.npd-co.com',
    value: 'sep.npd-co.com',
  },
  {
    id: 2,
    label: 'fence.npd-co.com',
    value: 'fence.npd-co.com',
  },
  {
    id: 3,
    label: 'stage.npd-co.com',
    value: 'stage.npd-co.com',
  },
];
