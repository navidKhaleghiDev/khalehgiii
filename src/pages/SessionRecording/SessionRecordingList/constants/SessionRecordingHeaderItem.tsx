import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import {
  convertToDateFormat,
  convertToDay,
  convertToHourFormat,
} from '@src/helper/utils/dateUtils';
import { EPermissionSessionRecording } from '@src/types/permissions';
import { Recording } from '@src/pages/SessionRecording/SessionRecordingList/components';

export const SessionRecordingHeaderItem: IHeaderTable[] = [
  {
    label: 'table.day',
    id: 'recrod_date',
    type: 'function',
    function: convertToDay,
    class: 'w-4/12',
  },
  {
    label: 'table.date',
    id: 'recrod_date',
    type: 'function',
    function: convertToDateFormat,
    class: 'w-4/12',
  },
  {
    label: 'table.startDate',
    id: 'start',
    type: 'function',
    function: convertToHourFormat,
    class: 'w-4/12',
  },
  {
    label: 'table.endDate',
    id: 'end',
    type: 'function',
    function: convertToHourFormat,
    class: 'w-4/12',
  },
  {
    label: 'table.time',
    id: 'record_length',
    type: 'none',
    class: 'w-4/12',
  },
  {
    label: 'table.play',
    id: 'record_name',
    type: 'component',
    component: (props: any) => (
      <Recording row={props.row} onClick={props.onClick} />
    ),
    permission: EPermissionSessionRecording.VIEW,
    class: 'w-4/12',
  },
];
