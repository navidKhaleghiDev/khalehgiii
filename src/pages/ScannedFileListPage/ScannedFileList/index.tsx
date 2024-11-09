import { useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IScannedFile } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { scannedFileHeaderItem } from '@src/pages/ScannedFileListPage/ScannedFileList/constants/scannedFileHeaderItem';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import {
  API_ANALYZE_DOWNLOAD_FILE,
  API_ANALYZE_SCAN_STATUS_UPDATE,
} from '@src/services/analyze';
import { MultiDatePicker } from '@redesignUi/atoms/Inputs/DatePicker';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { Modal } from '@redesignUi/molecules/Modal';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

const PAGE_SIZE = 8;
const PAGE = 1;

type ScannedFileListProp = {
  id: string;
};

export function ScannedFileList({ id }: ScannedFileListProp) {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [loading, setLoading] = useState<boolean>(false);
  const [cleanStatusModal, setCleanStatusModal] = useState(false);
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();
  const { t } = useTranslation();
  const { width } = useWindowDimensions();
  const userPermissions = useUserPermission();

  const { data, isLoading, mutate } = useSWR<IResponsePagination<IScannedFile>>(
    id
      ? E_ANALYZE_SCAN_PAGINATION(id, {
          page: currentPage,
          pageSize: PAGE_SIZE,
        })
      : null,
    HTTP_ANALYSES.fetcherSWR
  );

  const scannedFiles: IScannedFile[] = [
    {
      id: 1,
      file_name: 'document1.pdf',
      file_size_in_bytes: 204800,
      file_content_type: 'application/pdf',
      username: 'johndoe',
      yara_scanner_status: 'completed',
      clamav_scanner_status: 'completed',
      yara_scan_summary: 'No malicious patterns detected.',
      yara_scan_result: true,
      yara_error_message: null,
      clamav_scan_summary: 'No virus detected.',
      clamav_scan_result: true,
      antiviruses_scan_result: true,
      antiviruses_scanner_status: 'completed',
      antiviruses_scan_sandbox_summary: 'No suspicious behavior observed.',
      antiviruses_scan_vendors_summary: 'File passed all antivirus checks.',
      antiviruses_last_analysis_stats: '{malicious: 0, harmless: 56}',
      antiviruses_crowdsourced_ids_results:
        'No crowdsourced threats identified.',
      antiviruses_error_message: null,
      clamav_error_message: null,
      created_at: '2023-11-01T10:15:00Z',
      evidence_permission: true,
      scan_result: 'clean',
      antiviruses_status_code: null,
      downloadable_link: 'https://files.example.com/document1.pdf',
      file: 'path/to/document1.pdf',
      file_hash: 'a3d23f6c5b12a123e6d8b2f1f4d6c7b8',
      received_file_content_type: 'application/pdf',
      transmission_type: 'upload',
    },
    {
      id: 2,
      file_name: 'spreadsheet1.xlsx',
      file_size_in_bytes: 307200,
      file_content_type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      username: 'janedoe',
      yara_scanner_status: 'completed',
      clamav_scanner_status: 'failed',
      yara_scan_summary: 'Suspicious patterns detected in macros.',
      yara_scan_result: false,
      yara_error_message: null,
      clamav_scan_summary: null,
      clamav_scan_result: false,
      antiviruses_scan_result: false,
      antiviruses_scanner_status: 'completed',
      antiviruses_scan_sandbox_summary: 'File contains suspicious macros.',
      antiviruses_scan_vendors_summary: 'Detected as suspicious by 3 vendors.',
      antiviruses_last_analysis_stats: '{malicious: 3, harmless: 53}',
      antiviruses_crowdsourced_ids_results:
        'Macros contain unusual code sequences.',
      antiviruses_error_message: null,
      clamav_error_message: 'Error: File scan interrupted.',
      created_at: '2023-11-02T14:45:00Z',
      evidence_permission: false,
      scan_result: 'malicious',
      antiviruses_status_code: null,
      downloadable_link: 'https://files.example.com/spreadsheet1.xlsx',
      file: 'path/to/spreadsheet1.xlsx',
      file_hash: '7b65d8e1234b567d8c1237f6e8f1234d',
      received_file_content_type:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      transmission_type: 'email',
    },
    {
      id: 3,
      file_name: 'image1.png',
      file_size_in_bytes: 102400,
      file_content_type: 'image/png',
      username: 'alexsmith',
      yara_scanner_status: 'failed',
      clamav_scanner_status: 'completed',
      yara_scan_summary: null,
      yara_scan_result: false,
      yara_error_message: 'Error: File type not supported.',
      clamav_scan_summary: 'No virus detected.',
      clamav_scan_result: true,
      antiviruses_scan_result: true,
      antiviruses_scanner_status: 'completed',
      antiviruses_scan_sandbox_summary: 'No suspicious activity detected.',
      antiviruses_scan_vendors_summary: 'Passed all antivirus checks.',
      antiviruses_last_analysis_stats: '{malicious: 0, harmless: 60}',
      antiviruses_crowdsourced_ids_results:
        'No issues identified by community.',
      antiviruses_error_message: null,
      clamav_error_message: null,
      created_at: '2023-11-03T09:30:00Z',
      evidence_permission: true,
      scan_result: 'clean',
      antiviruses_status_code: null,
      downloadable_link: 'https://files.example.com/image1.png',
      file: 'path/to/image1.png',
      file_hash: 'f7d12b4e678c9d7a6b6e1234567f8a9d',
      received_file_content_type: 'image/png',
      transmission_type: 'upload',
    },
    {
      id: 4,
      file_name: 'script.js',
      file_size_in_bytes: 50240,
      file_content_type: 'application/javascript',
      username: 'chrisj',
      yara_scanner_status: 'completed',
      clamav_scanner_status: 'completed',
      yara_scan_summary: 'Detected obfuscated code patterns.',
      yara_scan_result: false,
      yara_error_message: null,
      clamav_scan_summary: 'Possible virus detected.',
      clamav_scan_result: false,
      antiviruses_scan_result: false,
      antiviruses_scanner_status: 'completed',
      antiviruses_scan_sandbox_summary: 'Malicious code execution detected.',
      antiviruses_scan_vendors_summary: 'Identified as malware by 5 vendors.',
      antiviruses_last_analysis_stats: '{malicious: 5, harmless: 45}',
      antiviruses_crowdsourced_ids_results:
        'Obfuscation identified in code blocks.',
      antiviruses_error_message: null,
      clamav_error_message: 'Detected potential threat.',
      created_at: '2023-11-04T13:00:00Z',
      evidence_permission: false,
      scan_result: 'malicious',
      antiviruses_status_code: null,
      downloadable_link: 'https://files.example.com/script.js',
      file: 'path/to/script.js',
      file_hash: 'b5f9e7a1c2d8f4b6a6d12345f6789c01',
      received_file_content_type: 'application/javascript',
      transmission_type: 'api',
    },
  ];

  const listDaas = data?.data?.results ?? scannedFiles;
  const countPage = data?.data?.count ?? 0;
  const evidencePermissions =
    listDaas[listDaas.length - 1]?.evidence_permission;

  const downloadFile = async (fileData: IScannedFile) => {
    await API_ANALYZE_DOWNLOAD_FILE(fileData)
      .then((res) => {
        const response = res.data;
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = fileData.file_name;

        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
      })
      .catch(() => {
        toast.error(
          !evidencePermissions
            ? t('global.dontHaveAccess')
            : t('global.somethingWentWrong')
        );
      });
  };

  const cleanStatus = async () => {
    if (activeScannedFile) {
      setLoading(true);
      await API_ANALYZE_SCAN_STATUS_UPDATE(activeScannedFile)
        .then(() => {
          mutate();
        })
        .catch((err) => {
          toast.error(err);
        })
        .finally(() => setLoading(false));
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal: OnClickActionsType<IScannedFile> = (action, item) => {
    if (action === 'download') {
      downloadFile(item);
    } else if (action === 'edit') {
      setActiveScannedFile({ ...item, scan_result: 'CLEAN' } as IScannedFile);
      setCleanStatusModal(true);
    } else {
      setActiveScannedFile(item as IScannedFile);
    }
  };

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
    paginationLabel: t('table.file'),
    allItems: countPage,
    itemsPer: listDaas.length,
  };

  return (
    <div className="w-full">
      <div className="text-start my-5">
        <MultiDatePicker
          id="recordFilter"
          name="recordFilter"
          onChange={() => console.log('This functionality does not work know')}
          disabled
        />
      </div>
      <div className="[&_thead]:bg-gray-100">
        <BaseTable
          body={listDaas}
          header={checkPermissionHeaderItem(
            userPermissions,
            scannedFileHeaderItem
          )}
          loading={isLoading}
          pagination={paginationProps}
          onClick={handleOpenModal}
          isMobile={width <= 760}
        />
      </div>
      <Modal
        open={cleanStatusModal}
        setOpen={setCleanStatusModal}
        type="error"
        title={t('global.sureAboutThis')}
        buttonOne={{
          label: t('global.yes'),
          onClick: () => cleanStatus(),
          loading,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setCleanStatusModal(false),
          color: 'red',
        }}
      />
    </div>
  );
}
