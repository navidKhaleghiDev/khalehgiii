import { useState } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IScannedFile } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { scannedFileHeaderItem } from '@src/pages/FIleReports/ReportFileScanPage/ScanFIleList/constants/scannedFileHeaderItem';
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

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count ?? 0;
  const evidencePermissions =
    listDaas[listDaas.length - 1]?.evidence_permission;

  const downloadFile = async (fileData: any) => {
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

  // const scanFile: IScannedFile[] = [
  //   {
  //     id: 1,
  //     file_name: 'document.pdf',
  //     file_size_in_bytes: 145678,
  //     file_content_type: 'application/pdf',
  //     username: 'john_doe',
  //     yara_scanner_status: 'COMPLETED',
  //     clamav_scanner_status: 'COMPLETED',
  //     yara_scan_summary: 'No malicious signatures found.',
  //     yara_scan_result: false,
  //     yara_error_message: null,
  //     clamav_scan_summary: 'File is clean.',
  //     clamav_scan_result: false,
  //     antiviruses_scan_result: false,
  //     antiviruses_scanner_status: 'COMPLETED',
  //     antiviruses_scan_sandbox_summary: null,
  //     antiviruses_scan_vendors_summary: 'No threats detected by 20 vendors.',
  //     antiviruses_last_analysis_stats:
  //       "{ 'malicious': 0, 'safe': 20, 'unknown': 0 }",
  //     antiviruses_crowdsourced_ids_results: null,
  //     antiviruses_error_message: null,
  //     clamav_error_message: null,
  //     created_at: '2023-10-10T10:30:45Z',
  //     evidence_permission: true,
  //     scan_result: 'CLEAN',
  //     antiviruses_status_code: null,
  //     downloadable_link: 'https://files.example.com/document.pdf',
  //     file: '/uploads/documents/document.pdf',
  //     file_hash: 'a5b9f12d76e8e9f34e3f6b2d65c72a8f',
  //     received_file_content_type: 'application/pdf',
  //     transmission_type: 'upload',
  //   },
  //   {
  //     id: 2,
  //     file_name: 'malware_sample.exe',
  //     file_size_in_bytes: 512000,
  //     file_content_type: 'application/vnd.microsoft.portable-executable',
  //     username: 'jane_smith',
  //     yara_scanner_status: 'COMPLETED',
  //     clamav_scanner_status: 'COMPLETED',
  //     yara_scan_summary: 'Malicious signature identified.',
  //     yara_scan_result: true,
  //     yara_error_message: null,
  //     clamav_scan_summary: 'Malware detected.',
  //     clamav_scan_result: true,
  //     antiviruses_scan_result: true,
  //     antiviruses_scanner_status: 'COMPLETED',
  //     antiviruses_scan_sandbox_summary: 'Malware behavior observed.',
  //     antiviruses_scan_vendors_summary:
  //       'Identified as malicious by 15 out of 20 vendors.',
  //     antiviruses_last_analysis_stats:
  //       "{ 'malicious': 15, 'safe': 5, 'unknown': 0 }",
  //     antiviruses_crowdsourced_ids_results:
  //       "{ 'threat_name': 'Trojan.Generic' }",
  //     antiviruses_error_message: null,
  //     clamav_error_message: null,
  //     created_at: '2023-10-15T15:45:20Z',
  //     evidence_permission: false,
  //     scan_result: 'MALICIOUS',
  //     antiviruses_status_code: null,
  //     downloadable_link: 'https://files.example.com/malware_sample.exe',
  //     file: '/uploads/samples/malware_sample.exe',
  //     file_hash: 'b1c3d9f23c456e7e8a9f9b8a5d3e72b9',
  //     received_file_content_type:
  //       'application/vnd.microsoft.portable-executable',
  //     transmission_type: 'email',
  //   },
  //   {
  //     id: 3,
  //     file_name: 'image.png',
  //     file_size_in_bytes: 25678,
  //     file_content_type: 'image/png',
  //     username: 'alex_kent',
  //     yara_scanner_status: 'FAILED',
  //     clamav_scanner_status: 'COMPLETED',
  //     yara_scan_summary: null,
  //     yara_scan_result: false,
  //     yara_error_message: 'YARA scan timeout.',
  //     clamav_scan_summary: 'File is clean.',
  //     clamav_scan_result: false,
  //     antiviruses_scan_result: false,
  //     antiviruses_scanner_status: 'COMPLETED',
  //     antiviruses_scan_sandbox_summary: null,
  //     antiviruses_scan_vendors_summary: 'No threats detected by 20 vendors.',
  //     antiviruses_last_analysis_stats:
  //       "{ 'malicious': 0, 'safe': 20, 'unknown': 0 }",
  //     antiviruses_crowdsourced_ids_results: null,
  //     antiviruses_error_message: null,
  //     clamav_error_message: null,
  //     created_at: '2023-10-20T08:20:10Z',
  //     evidence_permission: true,
  //     scan_result: 'CLEAN',
  //     antiviruses_status_code: null,
  //     downloadable_link: 'https://files.example.com/image.png',
  //     file: '/uploads/images/image.png',
  //     file_hash: 'c3b4e7f98d6a4f2a9e6b3e7a5c4d8f9e',
  //     received_file_content_type: 'image/png',
  //     transmission_type: 'upload',
  //   },
  // ];

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
