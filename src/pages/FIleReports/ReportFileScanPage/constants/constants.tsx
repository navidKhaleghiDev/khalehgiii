import PhQueue from '@iconify-icons/ph/queue';
import { UserScanCount } from '@ui/atoms/BaseTable/components/utils/UserScanCount';
import { EPermissionFileScan } from '@src/types/permissions';
import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@redesignUi/molecules/BaseTable/types';
import { IDaAs } from '@src/services/users/types';

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
    id: '',
    type: 'component',
    component: (props: BaseTableComponentCellProps<IDaAs>) => (
      <UserScanCount email={props.row.email} />
    ),
    class: 'w-1/12',
    isMobileCollapsed: true,
  },
  {
    id: 'button',
    type: 'action',
    action: [
      {
        icon: PhQueue,
        color: 'neutralNoBg',
        tooltip: 'table.observeUserBehavior',
        action: 'button',
      },
    ],
    permission: EPermissionFileScan.VIEW,
    class: 'mr-auto',
  },
];
