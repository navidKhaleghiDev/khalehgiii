import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { CircleBg } from '@ui/atoms/CircleBg';
import trashIcon from '@iconify-icons/ph/trash';
import notePencilIcon from '@iconify-icons/ph/note-pencil';
import { CheckCell } from '@ui/atoms/BaseTable/BaseTableComponents/CheckCell';

export function adminListHeaderItem() {
  return [
    {
      label: '',
      id: 'id',
      type: 'action',
      action: [
        {
          action: 'delete',
          icon: trashIcon,
          color: 'redNoBg',
          style: '',
        },
        {
          action: 'edit',
          icon: notePencilIcon,
          color: 'neutralNoBg',
          style: '',
        },
      ],

      dir: '',
      style: 'px-3 w-2/12',
    },
    {
      label: 'table.userName',
      id: 'username',
      type: 'none',
      dir: '',
      style: 'px-3 w-4/12',
      size: 'body4',
    },
    {
      label: 'table.email',
      id: 'email',
      type: 'none',
      dir: '',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
    {
      label: 'table.firstNameLastName',
      id: ['first_name', 'last_name'],
      type: 'user',
      dir: '',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
    {
      label: 'table.active',
      id: 'is_active',
      type: 'icon',
      icon: CircleBg,
      color: ['bg-green-600', 'bg-gray-400'],
      dir: '',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
    {
      label: 'table.metaAdmin',
      id: 'is_meta_admin',
      type: 'component',
      component: (props: any) => (
        <CheckCell id={props.row.is_meta_admin} head={props.head} />
      ),
      dir: '',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
    {
      label: 'table.dateOfCreated',
      id: 'created_at',
      type: 'function',
      function: dateAndNumber,
      dir: 'rtl',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
    {
      label: 'table.lastLogin',
      id: 'last_login',
      type: 'function',
      function: dateAndNumber,
      dir: 'rtl',
      style: 'px-3 w-2/12',
      size: 'body4',
    },
  ];
}
