import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import PhUserMinusThin from '@iconify-icons/ph/user-minus-thin';
import { t } from 'i18next';

export const dropdownOptions = [
  { id: 1, value: 'users', label: t('global.users') },
  { id: 2, value: 'admins', label: t('global.admins') },
];

export const groupManagementUserHeaderItem: HeaderTable[] = [
  {
    label: 'table.noting',
    id: 'userName',
    type: 'avatar',
    email: 'email',
    isActive: 'is_running',
    class: 'w-5/12 md:w-8/12  ',
  },
  {
    label: 'table.randomNothing',
    id: 'userName',
    type: 'drop',
    drop: {
      translateKey: 'global',
      options: dropdownOptions,
      defaultValueLabelKey: 'value',
      defaultValueKey: 'id',
    },
    class: 'w-1/12 mr-auto text-sm mx-3 flex justify-end',
  },
  {
    label: 'table.table.noting1',
    id: 'userName',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: PhUserMinusThin,
        color: 'neutralNoBg',
        size: 'sm',
        tooltip: 'groupManagement.deleteMember',
      },
    ],
    class: 'w-[32px]  flex justify-end',
  },
];
export const groupManagementAdminHeaderItem: HeaderTable[] = [
  {
    label: 'table.noting',
    id: 'userName',
    type: 'avatar',
    email: 'email',
    isActive: 'is_running',
    class: 'w-5/12 md:w-8/12  ',
  },
  {
    label: 'table.randomNothing',
    id: 'userName',
    type: 'drop',
    drop: {
      translateKey: 'global',
      options: dropdownOptions,
      defaultValueLabelKey: 'value',
      defaultValueKey: 'id',
    },
    class: 'w-1/12 mr-auto text-sm mx-3 flex justify-end',
  },
  {
    label: 'table.recording',
    id: 'userName',
    type: 'action',
    action: [
      {
        action: 'delete',
        icon: PhUserMinusThin,
        color: 'neutralNoBg',
        size: 'sm',
        tooltip: 'groupManagement.deleteMember',
      },
    ],
    class: 'w-[32px] flex justify-end',
  },
];
