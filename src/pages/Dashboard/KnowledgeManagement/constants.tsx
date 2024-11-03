import { Avatar, Typography } from '@redesignUi/atoms';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import userIcon from '@iconify-icons/ph/user';
import phPlay from '@iconify-icons/ph/play';

function convertSecondsToTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  return `${hours}:${String(minutes).padStart(2, '0')}:${String(
    remainingSeconds
  ).padStart(2, '0')}`;
}
export const KnowledgeManagementHeaderItem: HeaderTable[] = [
  {
    label: 'table.admin',
    id: 'admin.id',
    type: 'component',
    component: (props: any) => {
      return (
        <div className="flex items-center justify-center gap-2">
          <Avatar icon={userIcon} size="table" />
          <Typography variant="body6"> {props.row.admin.email}</Typography>
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
      <Typography variant="body6"> {props.row.admin.email}</Typography>
    ),
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.recordDate',
    id: 'created_at',
    type: 'date',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.group',
    id: 'group_name',
    type: 'none',
    class: 'px-3 w-2/12',
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
    class: 'px-3 w-2/12',
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
    class: 'w-2/12 sm:w-1/12 mr-auto ',
  },
];
