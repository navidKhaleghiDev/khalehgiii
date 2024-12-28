import { useTranslation } from 'react-i18next';

import Trash from '@iconify-icons/ph/trash-simple';
import NotePencil from '@iconify-icons/ph/pencil-simple';
import { PermissionUsers } from '@src/types/permissions';
import { HeaderTable } from '@ui/molecules/BaseTable/types';
import { Typography } from '@ui/atoms';

interface UserTypeComponentProps {
  row: {
    is_meta_admin: boolean;
  };
}

function UserTypeComponent({ row }: UserTypeComponentProps) {
  const { t } = useTranslation();
  return (
    <Typography variant="body6" color="black" className="whitespace-nowrap">
      {row.is_meta_admin ? t('table.metaAdmin') : t('header.admin')}
    </Typography>
  );
}
export const adminListHeaderItem: HeaderTable[] = [
  {
    label: 'table.email',
    id: ['first_name', 'last_name'],
    type: 'avatar',
    email: 'email',
    isActive: 'is_active',
    class: 'px-3 w-4/12 lg:w-3/12',
  },
  {
    label: 'table.lastLogin',
    id: 'last_login',
    type: 'date',
    class: 'px-3 lg:w-1/12 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'date',
    class: 'px-3 lg:w-1/12 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.userType',
    id: 'is_meta_admin',
    type: 'component',
    component: UserTypeComponent,
    class: 'px-3 lg:w-1/12 w-2/12',
    isMobileCollapsed: true,
  },

  {
    label: 'table.access',
    id: 'totp_enable',
    type: 'component',
    component: (props: any) => (
      <Typography variant="body6B" color="black">
        {props.row.totp_enable ? 'MFA' : '--'}
      </Typography>
    ),
    isMobileCollapsed: true,

    class: 'px-3 w-1/12',
  },

  {
    id: 'action',
    type: 'menu',
    tooltip: 'table.moreDetail',
    menu: [
      {
        action: 'edit',
        icon: NotePencil,
        color: 'neutralNoBg',
        permission: PermissionUsers.CHANGE,
        title: 'table.editAdminInfo',
      },
      {
        action: 'delete',
        icon: Trash,
        color: 'redNoBg',
        permission: PermissionUsers.DELETE,
        title: 'table.deleteAdmin',
      },
    ],
    permission: [PermissionUsers.CHANGE, PermissionUsers.DELETE],
    class: ' mr-auto w-2/12 lg:w-1/12',
  },
];
