import { dateAndNumber } from '@src/helper/utils/dateUtils';
import trashIcon from '@iconify-icons/ph/trash';
import notePencilIcon from '@iconify-icons/ph/note-pencil';
import { Check } from '@ui/atoms/BaseTable/components/tableIcons/Check';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import { EPermissionUsers } from '@src/types/permissions';

export const adminListHeaderItem: IHeaderTable[] = [
  {
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: trashIcon,
        color: 'redNoBg',
        permission: EPermissionUsers.DELETE,
      },
      {
        action: 'edit',
        icon: notePencilIcon,
        color: 'neutralNoBg',
        permission: EPermissionUsers.CHANGE,
      },
    ],
    permission: [EPermissionUsers.CHANGE, EPermissionUsers.DELETE],
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.userName',
    id: 'username',
    type: 'none',
    class: 'px-3 w-1/12',
  },
  {
    label: 'table.email',
    id: 'email',
    type: 'none',

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.firstNameLastName',
    id: ['first_name', 'last_name'],
    type: 'user',

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.active',
    id: 'is_active',
    type: 'component',
    component: (props: any) => <Circle id={props.row.is_active} />,

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.metaAdmin',
    id: 'is_meta_admin',
    type: 'component',
    component: (props: any) => (
      <Check id={props.row.is_meta_admin} header={props.head} />
    ),

    class: 'px-3 w-2/12',
  },
  {
    label: 'table.dateOfCreated',
    id: 'created_at',
    type: 'function',
    function: dateAndNumber,
    dir: 'rtl',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.activeOtp',
    id: 'totp_enable',
    type: 'component',
    component: (props: any) => <Circle id={props.row.totp_enable} />,
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.activeQrcode',
    id: 'totp_secret',
    type: 'component',
    component: (props: any) => <Circle id={props.row.totp_secret} />,
    class: 'px-3 w-2/12',
  },

  {
    label: 'table.lastLogin',
    id: 'last_login',
    type: 'function',
    function: dateAndNumber,
    dir: 'rtl',
    class: 'px-3 w-2/12',
  },
];
