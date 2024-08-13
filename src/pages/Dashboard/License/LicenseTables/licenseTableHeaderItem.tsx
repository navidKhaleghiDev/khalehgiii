import { IHeaderTable } from '@ui/atoms/BaseTable/types';

export const licenseHeaderItem: IHeaderTable[] = [
  {
    label: 'license.licenseId',
    id: 'license_id',
    type: 'none',
    class: 'w-32',
  },
  {
    label: 'license.licenseValidation',
    id: 'valid_license',
    type: 'none',
    class: 'w-32',
  },
  {
    label: 'license.licenseExpirationDate',
    id: 'license_expiration_date',
    type: 'date',
    class: 'w-32',
  },
  {
    label: 'license.licenseCreationDate',
    id: 'license_creation',
    type: 'date',
    class: 'w-32',
  },
  {
    label: 'license.recordLicenseNumber',
    id: 'record_license_number',
    type: 'none',
    class: 'w-32',
  },
  {
    label: 'license.assistanceLicense',
    id: 'assistance_license',
    type: 'none',

    class: 'w-32',
  },
  {
    label: 'license.assistanceLicenseNumber',
    id: 'assistance_license_number',
    type: 'none',

    class: 'w-32',
  },
  {
    label: 'license.totalUserLicense',
    id: 'total_users_license',
    type: 'none',

    class: 'w-32',
  },
  {
    label: 'license.concurrentUsersLicense',
    id: 'concurrent_users_license',
    type: 'none',

    class: 'w-32',
  },
  {
    label: 'license.clipboardAccessLicense',
    id: 'clipboard-access_license',
    type: 'none',

    class: 'w-48',
  },
  {
    label: 'license.clipboardAccessLicenseNumber',
    id: 'clipboard_access_license_number',
    type: 'none',

    class: 'w-48',
  },
  {
    label: 'license.chatRoomLicense',
    id: 'chatroom_license',
    type: 'none',

    class: 'w-32',
  },
  {
    label: 'license.chatroomLicenseNumber',
    id: 'chatroom_license_number',
    type: 'none',

    class: 'w-32',
  },
];
