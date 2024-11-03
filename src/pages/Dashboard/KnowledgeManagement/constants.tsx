import phPlay from '@iconify-icons/ph/play';
import userIcon from '@iconify-icons/ph/user';
import { Avatar, Typography } from '@redesignUi/atoms';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { convertSecondsToTime } from '@src/helper/utils/convertSecoundToTIme';

export const KnowledgeManagementHeaderItem: HeaderTable[] = [
  {
    label: 'table.admin',
    id: 'admim',
    type: 'component',
    component: (props: any) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <Avatar icon={userIcon} size="table" />
          <Typography variant="body6" className="overflow-hidden ">
            {props.row.admin.email}
          </Typography>
        </div>
      );
    },
    class: 'px-3 w-4/12',
  },
  {
    label: 'table.user',
    id: 'user',
    type: 'component',
    component: (props: any) => (
      <Typography variant="body6" className="overflow-hidden ">
        {props.row.user.email}
      </Typography>
    ),
    class: 'px-3 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.recordDate',
    id: 'created_at',
    type: 'date',
    class: 'px-3 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.group',
    id: 'group_name',
    type: 'none',
    class: 'px-3 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.videoDuration',
    id: 'duration_time',
    type: 'component',
    component: (props: any) => {
      const myDuration = props.row.duration_time
        ? `${convertSecondsToTime(props.row.duration_time)}`
        : '0';
      return <Typography>{myDuration}</Typography>;
    },
    class: 'px-3 w-2/12 ',
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
    class: 'px-3 w-1/12 mr-auto',
  },
];
