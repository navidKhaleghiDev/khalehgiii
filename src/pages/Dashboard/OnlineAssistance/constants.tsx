import { OnlineAssistanceUserModel } from '@src/services/users/types';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';

function convertSecondsToMinutes(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes} دقیقه ${Math.floor(remainingSeconds)} ثانیه`;
}

export const onlineAssistanceHeaderItem: IHeaderTable[] = [
  {
    label: 'header.admin',
    id: 'admin',
    type: 'function',
    function: (admin: OnlineAssistanceUserModel) => admin?.email,
    class: 'px-3 w-4/12',
  },
  {
    label: 'header.user',
    id: 'user',
    type: 'function',
    function: (user: OnlineAssistanceUserModel) => user?.email,
    class: 'px-3 w-2/12',
  },
  {
    label: 'groupManagement.group',
    id: 'group_name',
    type: 'none',
    class: 'px-3 w-2/12',
  },
  {
    label: 'global.videoDuration',
    id: 'duration_time',
    type: 'function',
    dir: 'rtl',
    function: (duration_time: number) => (
      <>
        ‍‍‍‍‍{duration_time ? `${convertSecondsToMinutes(duration_time)}` : '0'}
      </>
    ),
    class: 'px-3 w-2/12',
  },
  {
    label: 'global.recordDate',
    id: 'created_at',
    type: 'date',
    class: 'px-3 w-2/12',
  },
  {
    label: '',
    id: 'playVideo',
    class: 'px-3 w-2/12',
    type: 'button',
    buttonProps: {
      label: 'پخش ویدیو',
      type: 'default',
      size: 'sm',
    },
  },
];
