import PhDownloadSimpleFill from '@iconify-icons/ph/download-simple-bold';
import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { IHeaderTable, TTableType } from '@ui/atoms/BaseTable/types';
import { CircleBorder } from '@ui/atoms/BaseTable/components/tableIcons/CircleBorder';
import { EPermissionScanReports } from '@src/types/permissions';

const download = {
  label: 'table.download',
  id: 'id',
  type: 'action' as TTableType,
  action: [
    {
      action: 'download',
      icon: PhDownloadSimpleFill,
      color: 'neutralNoBg',
    },
  ],
  permission: EPermissionScanReports.VIEW,
  class: 'px-3 w-2/12',
};

export const scannedFileHeaderItem = (
  downloadPermissions: boolean
): IHeaderTable[] => {
  return [
    ...(downloadPermissions ? [download] : []),
    {
      label: 'table.fileName',
      id: 'file_name',
      type: 'tooltip' as TTableType, // Explicitly specify the type
      class: 'px-3 w-2/12 font-bold',
    },
    {
      label: 'table.type',
      id: 'file_content_type',
      type: 'tooltip' as TTableType,
      class: 'px-3 w-2/12',
    },
    {
      label: 'table.resultScanerStatusYara',
      id: 'yara_scanner_status',
      type: 'component' as TTableType,
      component: (props: any) => (
        <CircleBorder
          results={props.row.yara_scan_result}
          id={props.row[props.id]}
        />
      ),
      class: 'px-3 w-2/12',
    },
    {
      label: 'table.resultScanerStatusClamav',
      id: 'clamav_scanner_status',
      type: 'component' as TTableType,
      component: (props: any) => (
        <CircleBorder
          results={props.row.clamav_scan_result}
          id={props.row[props.id]}
        />
      ),
      class: 'px-3 w-2/12',
    },
    {
      label: 'table.resultScanerStatusSandbox',
      id: 'antiviruses_scanner_status',
      type: 'component' as TTableType,
      component: (props: any) => (
        <CircleBorder
          results={props.row.antiviruses_scan_result}
          id={props.row[props.id]}
        />
      ),
      class: 'px-3 w-2/12',
    },
    {
      label: 'table.moreDetail',
      id: 'is_running',
      type: 'action' as TTableType,
      action: [
        {
          action: 'modal',
          icon: moreIcon,
          color: 'neutralNoBg',
        },
      ],
      permission: EPermissionScanReports.VIEW,
      class: 'px-3 w-2/12',
    },
  ];
};
