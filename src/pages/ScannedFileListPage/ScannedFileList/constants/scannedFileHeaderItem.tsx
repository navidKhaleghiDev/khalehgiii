// import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
// import PhArrowCounterClockwiseBold from '@iconify-icons/ph/arrow-counter-clockwise-bold';
// import { IHeaderTable, TableType } from '@ui/atoms/BaseTable/types';
// import { CircleBorder } from '@ui/atoms/BaseTable/components/tableIcons/CircleBorder';
// import { EPermissionScanReports } from '@src/types/permissions';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';

// const download = {
//   label: 'table.download',
//   id: 'id',
//   type: 'action' as TableType,
//   action: [
//     {
//       action: 'download',
//       icon: PhDownloadSimpleFill,
//       color: 'neutralNoBg',
//     },
//   ],
//   permission: EPermissionScanReports.VIEW,
//   class: 'px-3 w-2/12',
// };

export const scannedFileHeaderItem: HeaderTable[] = [
  {
    label: 'table.fileName',
    id: 'file_name',
    type: 'none',
    class: 'px-2 w-2/12 max-w-[70px]',
  },
  {
    label: 'table.type',
    id: 'file_content_type',
    type: 'none',
    class: 'px-5 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.resultScanerStatusYara',
    id: 'yara_scanner_result',
    type: 'component',
    component: (props: any) => (
      <TagHelperCell
        title={props.row.yara_scanner_result ? 'Virus' : 'N.V'}
        color={props.row.yara_scanner_result ? 'red' : 'teal'}
      />
    ),
    class: 'w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.resultScanerStatusSandbox',
    id: 'antiviruses_scanner_result',
    type: 'component',
    component: (props: any) => (
      <TagHelperCell
        title={props.row.antiviruses_scanner_result ? 'Virus' : 'N.V'}
        color={props.row.antiviruses_scanner_result ? 'red' : 'teal'}
      />
    ),
    class: 'w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.resultScanerStatusClamav',
    id: 'clamav_scan_result',
    type: 'component',
    component: (props: any) => (
      <TagHelperCell
        title={props.row.clamav_scan_result ? 'Virus' : 'N.V'}
        color={props.row.clamav_scan_result ? 'red' : 'teal'}
      />
    ),
    class: 'w-2/12',
    isMobileCollapsed: true,
  },

  // {
  //   id: 'scan_result',
  //   type: 'action',
  //   action: [
  //     {
  //       action: 'edit',
  //       icon: PhArrowCounterClockwiseBold,
  //       color: 'neutralNoBg',
  //     },
  //   ],
  //   // permission: EPermissionScanReports.CHANGE,
  //   class: 'px-3 w-2/12',
  // },
  // {
  //   id: 'is_running',
  //   type: 'action',
  //   action: [
  //     {
  //       action: 'modal',
  //       icon: moreIcon,
  //       color: 'neutralNoBg',
  //     },
  //   ],
  //   permission: EPermissionScanReports.VIEW,
  //   class: 'px-3 w-2/12',
  // },
];
