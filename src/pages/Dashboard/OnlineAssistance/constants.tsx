import { IHeaderTable } from '@ui/atoms/BaseTable/types';

export const onlineAssistanceHeaderItem: IHeaderTable[] = [
  {
    label: 'header.admin',
    id: 'admin',
    type: 'none',
    class: 'px-3 w-4/12',
  },
  {
    label: 'header.user',
    id: 'user',
    type: 'none',
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
    function: (duration_time: string) => <>‍‍‍‍‍{`${duration_time}`} دقیقه</>,
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
