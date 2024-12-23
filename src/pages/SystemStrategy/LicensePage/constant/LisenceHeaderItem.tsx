import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@ui/molecules/BaseTable/types';
import { TagHelperCell } from '@ui/molecules/BaseTable/components/HelperCell/TagHelperCell';
import { LicenseFileType } from '../type';

export const LisenceHeaderItem: HeaderTable[] = [
  {
    label: 'table.lisenceName',
    id: 'name',
    type: 'none',
    class: 'px-3 w-6/12  md:w-3/12 xl:w-2/12',
  },
  // need new api
  // {
  //   label: 'table.lisenceName',
  //   id: 'users',
  //   type: 'none',
  //   class: 'px-3 w-6/12  md:w-3/12 xl:w-2/12',
  //   isCollapsed: true,
  // },
  {
    label: 'table.licenseExpirationDate',
    id: 'expiry',
    type: 'date',
    class: 'px-3 md:w-3/12 xl:w-2/12',
    isMobileCollapsed: true,
  },

  {
    label: 'table.licenseStatus',
    id: 'license',
    type: 'component',
    component: (props: BaseTableComponentCellProps<LicenseFileType>) => (
      <TagHelperCell
        title={props.row.active ? 'table.active' : 'table.inActive'}
        translate
        color={props.row.active ? 'teal' : 'yellow'}
      />
    ),
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  // need new api
  //   {
  //     label: 'table.licenseCreationDate',
  //     id: 'license_creation',
  //     type: 'date',
  //     class: 'w-32',
  //   },
  {
    label: 'table.number',
    id: 'number',
    type: 'none',
    class: 'px-3 md:w-2/12 xl:w-1/12',
    isMobileCollapsed: true,
  },

  {
    label: 'table.activeNumbers',
    id: 'active',
    type: 'none',
    class: 'px-3 md:w-2/12 xl:w-1/12',
    isMobileCollapsed: true,
  },
  // need new api

  // {
  //   label: 'table.totalUserLicense',
  //   id: 'total_users_license',
  //   type: 'none',

  //   class: 'px-3 md:w-2/12 xl:w-1/12',
  // },
  // {
  //   label: 'table.concurrentUsersLicense',
  //   id: 'concurrent_users_license',
  //   type: 'none',
  //   class: 'px-3 md:w-2/12 xl:w-1/12',
  // },
  //   {
  //     label: 'table.clipboardAccessLicense',
  //     id: 'clipboard_access_license',
  //     type: 'component',
  //     component: (props: any) => (
  //       <Circle id={props.row.clipboard_access_license} />
  //     ),
  //     class: 'w-48',
  //   },
  //   {
  //     label: 'table.clipboardAccessLicenseNumber',
  //     id: 'clipboard_access_license_number',
  //     type: 'none',

  //     class: 'w-48',
  //   },
  //   {
  //     label: 'table.chatRoomLicense',
  //     id: 'chatroom_license',
  //     type: 'component',
  //     component: (props: any) => <Circle id={props.row.chatroom_license} />,
  //     class: 'w-32',
  //   },
  //   {
  //     label: 'table.chatroomLicenseNumber',
  //     id: 'chatroom_license_number',
  //     type: 'none',

  //     class: 'w-32',
  //   },
];
