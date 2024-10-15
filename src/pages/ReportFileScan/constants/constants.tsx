import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { UserScanCount } from '@ui/atoms/BaseTable/components/utils/UserScanCount';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { EPermissionFileScan } from '@src/types/permissions';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';

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
        action: ROUTES_PATH.reportsScanFile,
        icon: moreIcon,
        color: 'neutralNoBg',
        tooltip: 'table.observeUserBehavior',
      },
    ],
    permission: EPermissionFileScan.VIEW,

    class: 'px-3 w-2/12',
  },
];

export const domainOptions: OptionSelect[] = [
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
export const groupOptions: OptionSelect[] = [
  {
    id: 1,
    label: 'Human Resource',
    value: 'Human Resource',
  },
  {
    id: 2,
    label: 'commercial',
    value: 'commercial',
  },
  {
    id: 3,
    label: 'media',
    value: 'media',
  },
];
export const filterOptions = [
  { id: '1', value: 'alphabtic', label: 'حروف الفبا' },
  { id: '2', value: 'date', label: 'تاریخ ایجاد' },
  { id: '3', value: 'newest', label: 'جدیدترین' },
];
