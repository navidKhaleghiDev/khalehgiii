import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { CircleBorder } from '@ui/atoms/BaseTable/components/tableIcons/CircleBorder';

export const scannedFileHeaderItem: IHeaderTable[] = [
  {
    label: 'table.download',
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'download',
        icon: moreIcon,
        color: 'neutralNoBg',
      },
    ],
    dir: '',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.fileName',
    id: 'file_name',
    type: 'tooltip',
    dir: '',
    class: 'px-3 w-2/12 font-bold',
  },
  {
    label: 'table.type',
    id: 'file_content_type',
    type: 'tooltip',
    dir: '',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.resultScanerStatusYara',
    id: 'yara_scanner_status',
    type: 'component',
    component: (props: any) => (
      <CircleBorder
        results={props.row.yara_scan_result}
        id={props.row[props.id]}
      />
    ),
    dir: '',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.resultScanerStatusClamav',
    id: 'clamav_scanner_status',
    type: 'component',
    component: (props: any) => (
      <CircleBorder
        results={props.row.clamav_scan_result}
        id={props.row[props.id]}
      />
    ),
    dir: '',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.resultScanerStatusSandbox',
    id: 'antiviruses_scanner_status',
    type: 'component',
    component: (props: any) => (
      <CircleBorder
        results={props.row.antiviruses_scan_result}
        id={props.row[props.id]}
      />
    ),
    dir: '',
    class: 'px-3 w-2/12',
  },
  {
    label: 'table.moreDetail',
    id: 'is_running',
    type: 'action',
    action: [
      {
        action: 'modal',
        icon: moreIcon,
        color: 'neutralNoBg',
      },
    ],
    dir: '',
    class: 'px-3 w-2/12',
  },
];
