import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';
import { ErrorIcon } from '@src/pages/FIleReports/ReportFileScanPage/Components/ErrorIcon';
import { EPermissionScanReports } from '@src/types/permissions';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';

export const scannedFileHeaderItem: HeaderTable[] = [
  {
    label: 'table.fileName',
    id: 'file_name',
    type: 'none',
    class: 'px-2 sm:w-2/12 max-w-[70px]',
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
  {
    id: 'scan_result_all',
    type: 'component',
    component: (props: any) => <ErrorIcon data={props} />,
    class: 'mr-auto w-1/12',
  },
  {
    id: 'download',
    type: 'action',
    action: [
      {
        action: 'download',
        icon: PhDownloadSimple,
        color: 'neutralNoBg',
      },
    ],
    class: 'px-2 w-1/12 mr-auto',
    permission: EPermissionScanReports.CHANGE,
  },
];
