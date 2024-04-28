import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import PhPlayCircleLight from '@iconify-icons/ph/play-circle-light';
import { convertToDateFormat, convertToDay } from '@src/helper/utils/dateUtils';

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
    label: 'table.time',
    id: 'record_length',
    type: 'none',
    class: 'w-4/12',
  },
  {
    label: 'table.play',
    id: 'record_name',
    type: 'action',
    action: [
      {
        action: 'more',
        icon: PhPlayCircleLight,
        color: 'tealNoBg',
        size: 'xxl',
      },
    ],
    class: 'w-4/12',
  },
];
