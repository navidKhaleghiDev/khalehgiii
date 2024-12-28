import PhQueue from '@iconify-icons/ph/queue';
import { PermissionFileScan } from '@src/types/permissions';
import { UserScanCount } from '@ui/molecules/BaseTable/components/utils/UserScanCount';
import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@ui/molecules/BaseTable/types';
import { DaAsParams } from '@src/services/users/types';

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
    component: (props: BaseTableComponentCellProps<DaAsParams>) => (
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
    permission: PermissionFileScan.VIEW,
    class: 'mr-auto',
  },
];
