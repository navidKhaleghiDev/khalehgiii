import PhNewspaper from '@iconify-icons/ph/newspaper';
import PhUsersThree from '@iconify-icons/ph/users-three';
import PhCubeFocus from '@iconify-icons/ph/cube-focus';
import { IconifyIcon } from '@iconify/react';

export interface ItemsProps {
  id: string;
  label: string;
  icon: IconifyIcon;
  color: string;
}
export const items: ItemsProps[] = [
  {
    id: '1',
    label: '10 روز تا پایان لایسنس باقی مانده است .',
    icon: PhNewspaper,
    color: '!text-yellow-500 !bg-yellow-100',
  },
  {
    id: '2',
    label: 'گروه “رسانه” به لیست گروه‌ها اضافه شد .',
    icon: PhUsersThree,
    color: '!text-teal-500 !bg-teal-100',
  },
  {
    id: '3',
    label: '2 فایل آلوده در سامانه پیدا شد .',
    icon: PhCubeFocus,
    color: '!text-red-500 !bg-red-100',
  },
];
