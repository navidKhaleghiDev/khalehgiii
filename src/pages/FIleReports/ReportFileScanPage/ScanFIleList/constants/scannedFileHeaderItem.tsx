import {
  BaseTableComponentCellProps,
  HeaderTable,
} from '@redesignUi/molecules/BaseTable/types';
import { TagHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TagHelperCell';
import { ErrorIcon } from '@src/pages/FIleReports/ReportFileScanPage/Components/ErrorIcon';
import PhDownloadSimple from '@iconify-icons/ph/download-simple';
import { IScannedFile } from '@src/services/analyze/types';
import { EPermissionScanReports } from '@src/types/permissions';

export const scannedFileHeaderItem: HeaderTable[] = [
  {
    label: 'table.fileName',
    id: 'file_name',
    type: 'none',
    class: 'w-9/12 text-start w-[150px] sm:w-full md:w-2/12  md:max-w-[90px]',
  },
  {
    label: 'table.type',
    id: 'file_content_type',
    type: 'none',
    class: 'px-3 md:w-2/12 md:max-w-[90px]',
    isMobileCollapsed: true,
  },
  {
    label: 'table.resultScanerStatusYara',
    id: 'yara_scanner_result',
    type: 'component',
    component: (props: BaseTableComponentCellProps<IScannedFile>) => (
      <TagHelperCell
        title={props.row.yara_scan_result ? 'Virus' : 'N.V'}
        color={props.row.yara_scan_result ? 'red' : 'teal'}
      />
    ),
    class: 'px-3 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.resultScanerStatusSandbox',
    id: 'antiviruses_scanner_result',
    type: 'component',
    component: (props: BaseTableComponentCellProps<IScannedFile>) => (
      <TagHelperCell
        title={props.row.antiviruses_scan_result ? 'Virus' : 'N.V'}
        color={props.row.antiviruses_scan_result ? 'red' : 'teal'}
      />
    ),
    class: 'px-3 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.resultScanerStatusClamav',
    id: 'clamav_scan_result',
    type: 'component',
    component: (props: BaseTableComponentCellProps<IScannedFile>) => (
      <TagHelperCell
        title={props.row.clamav_scan_result ? 'Virus' : 'N.V'}
        color={props.row.clamav_scan_result ? 'red' : 'teal'}
      />
    ),
    class: 'px-3 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.virusWarning',
    id: 'scan_result_all',
    type: 'component',
    component: (props: BaseTableComponentCellProps<IScannedFile>) => (
      <ErrorIcon data={props} />
    ),
    class: 'w-1/12 mr-auto',
  },
  {
    label: 'table.downloadRecord',
    id: 'download',
    type: 'action',
    action: [
      {
        action: 'download',
        icon: PhDownloadSimple,
        color: 'neutralNoBg',
      },
    ],
    class: 'w-1/12 mr-auto',
    permission: EPermissionScanReports.VIEW,
  },
];
