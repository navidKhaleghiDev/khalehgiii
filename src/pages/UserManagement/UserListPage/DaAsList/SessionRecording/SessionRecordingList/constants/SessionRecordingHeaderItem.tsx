import Play from '@iconify-icons/ph/play';

import { PermissionSessionRecording } from '@src/types/permissions';
import { HeaderTable } from '@ui/molecules/BaseTable/types';
import { ConvertedSecondsHelperCell } from '@ui/molecules/BaseTable/components/HelperCell/ConvertedSecondsHelperCell';

export const SessionRecordingHeaderItem: HeaderTable[] = [
  {
    label: 'table.days',
    id: 'recrod_date',
    type: 'date',
    render: 'day',
    class: 'lg:w-2/12 w-4/12',
  },
  {
    label: 'table.recordDate',
    id: 'recrod_date',
    type: 'date',
    render: 'date',
    class: 'sm:w-2/12 w-4/12',
  },
  {
    label: 'table.startTime',
    id: 'start',
    type: 'date',
    render: 'hour',
    class: 'w-2/12',
  },
  {
    label: 'table.lastTime',
    id: 'end',
    type: 'date',
    render: 'hour',
    class: 'w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.duration',
    id: 'record_length',
    type: 'component',
    component: (props: any) => (
      <ConvertedSecondsHelperCell time={props.row.record_length} />
    ),
    class: 'w-2/12',
  },

  {
    id: 'action',
    type: 'action',
    label: 'table.play',
    action: [
      {
        action: 'more',
        icon: Play,
        color: 'neutralNoBg',
        permission: PermissionSessionRecording.VIEW,
      },
    ],
    class: 'mr-auto w-1/12',
  },
];
