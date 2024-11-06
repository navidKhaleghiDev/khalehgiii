import { UserScanCount } from '@ui/atoms/BaseTable/components/utils/UserScanCount';
import { EPermissionFileScan } from '@src/types/permissions';
import PhQueue from '@iconify-icons/ph/queue';
import { OptionSelect } from '@redesignUi/atoms/BaseDropdown/type';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';

export const monitoringHeaderItem: HeaderTable[] = [
  {
    label: 'table.email',
    id: 'email',
    type: 'avatar',
    isActive: 'is_running',
    email: 'email',
    class: 'w-10/12 md:w-5/12 lg:w-3/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'date',
    class: 'w-2/12 lg:w-1/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.scans',
    id: 'last_uptime',
    type: 'component',
    component: (props: any) => <UserScanCount email={props.row.email} />,
    class: 'w-1/12',
    isMobileCollapsed: true,
  },
  {
    id: 'id',
    type: 'action',
    action: [
      {
        icon: PhQueue,
        color: 'neutralNoBg',
        tooltip: 'table.observeUserBehavior',
      },
    ],
    permission: EPermissionFileScan.VIEW,

    class: 'mr-auto',
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
