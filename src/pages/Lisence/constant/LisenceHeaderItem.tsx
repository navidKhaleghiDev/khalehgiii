import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@redesignUi/molecules/BaseTable/types';
import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';
import { LicenseFileType } from '../type';

export const LisenceHeaderItem: HeaderTable[] = [
  {
    label: 'table.lisenceName',
    id: 'license_id',
    type: 'none',
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.licenseExpirationDate',
    id: 'license_expiration_date',
    type: 'date',
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.licenseStatus',
    id: '',
    type: 'component',
    component: (props: BaseTableComponentCellProps<LicenseFileType>) => (
      <TagHelperCell
        title={props.row.active ? 'table.active' : 'table.block'}
        translate
        color={props.row.active ? 'teal' : 'yellow'}
      />
    ),
    class: 'w-32',
  },
  //   {
  //     label: 'table.licenseCreationDate',
  //     id: 'license_creation',
  //     type: 'date',
  //     class: 'w-32',
  //   },
  {
    label: 'table.recordLicenseNumber',
    id: 'table.record_license_number',
    type: 'none',
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.assistanceLicense',
    id: 'assistance_license',
    type: 'component',
    component: (props: any) => <Circle id={props.row.assistance_license} />,
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.assistanceLicenseNumber',
    id: 'assistance_license_number',
    type: 'none',

    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.totalUserLicense',
    id: 'total_users_license',
    type: 'none',

    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
  {
    label: 'table.concurrentUsersLicense',
    id: 'concurrent_users_license',
    type: 'none',
    class: 'px-3 md:w-2/12 xl:w-1/12',
  },
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
