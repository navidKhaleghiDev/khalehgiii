import phPlay from '@iconify-icons/ph/play';
import { Typography } from '@redesignUi/atoms';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { convertSecondsToTime } from '@src/helper/utils/convertSecoundToTIme';

export const KnowledgeManagementHeaderItem: HeaderTable[] = [
  {
    label: 'table.admin',
    id: 'admin_email',
    type: 'avatar',
    // Remember to ask that we do not have active status of user
    isActive: 'is_running',
    email: 'admin_email',
    class: 'w-10/12 md:w-4/12 lg:w-3/12',
  },
  {
    label: 'table.user',
    id: 'user_email',
    type: 'none',
    class: 'w-2/12 lg:w-2/12 w-[65px] px-3 lg:px-0',
    isMobileCollapsed: true,
  },
  {
    label: 'table.recordDate',
    id: 'created_at',
    type: 'date',
    class: 'w-1/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.group',
    id: 'group_name',
    type: 'none',
    class: 'px-5 lg:px-0 w-2/12 lg:w-1/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.videoDuration',
    id: 'duration_time',
    type: 'component',
    component: (props: any) => {
      return (
        <Typography color="neutralDark" variant="body6">
          {convertSecondsToTime(props.row.duration_time)}
        </Typography>
      );
    },
    class: 'w-2/12 lg:w-1/12',
    isMobileCollapsed: true,
  },
  {
    id: 'playVideo',
    type: 'action',
    action: [
      {
        icon: phPlay,
        color: 'neutralNoBg',
        tooltip: 'table.play',
      },
    ],
    class: 'mr-auto',
  },
];
