import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { HTTP_ANALYSES } from '@src/services/http';
import { IScannedFile } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { API_ANALYZE_DOWNLOAD_FILE } from '@src/services/analyze';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { LoadingSpinner } from '@redesignUi/molecules/Loading';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { StringifyProperties } from '@src/types/global';
import { useGetPagination } from '@src/services/http/httpClient';

import { getScanFileHeader } from './constants/scannedFileHeaderItem';
import {
  DateFormat,
  ScanFileDatePicker,
} from '../../ReportFileScanPage/ScanFilesDatePicker';

const PAGE_SIZE = 8;
const PAGE = 1;

export function ScannedFileList({ userEmail }: { userEmail: string }) {
  const [isLoadingDownload, setIsLoadingDownload] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [dateRange, setDateRange] = useState<DateFormat>();

  const userPermissions = useUserPermission();
  const { width, height } = useWindowDimensions();
  const { t } = useTranslation();

  // Daas user scan reports
  const { isLoading, error, resultData, count } =
    useGetPagination<IScannedFile>(
      E_ANALYZE_SCAN_PAGINATION(userEmail, {
        page: currentPage,
        pageSize: PAGE_SIZE,
        dateRange,
      }),
      HTTP_ANALYSES.fetcherSWR
    );

  // Daas user download file permission per user
  const evidencePermissions =
    resultData[resultData.length - 1]?.evidence_permission;

  const downloadFile = async (
    fileData: IScannedFile | StringifyProperties<IScannedFile>
  ) => {
    setIsLoadingDownload(true);
    await API_ANALYZE_DOWNLOAD_FILE(fileData)
      .then((res) => {
        const response = res.data;
        const url = window.URL.createObjectURL(response);
        const a = document.createElement('a');
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
      })
      .finally(() => setIsLoadingDownload(false));
  };

  const handelClickRow: OnClickActionsType<IScannedFile> = (action, item) => {
    if (action === 'download' && item) {
      downloadFile(item);
    }
  };

  // Table data
  const paginationProps = {
    countPage: count,
    currentPage,
    totalPages: Math.ceil(count / PAGE_SIZE),
    onPageChange: (page: number) => setCurrentPage(page),
    paginationLabel: t('table.file'),
    allItems: count,
    itemsPer: resultData.length,
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <ScanFileDatePicker onChange={(value) => setDateRange(value)} />
        {isLoadingDownload && <LoadingSpinner />}
      </div>
      <div
        className={`[&_thead]:bg-gray-100 ${
          height <= 670
            ? 'h-[180px] overflow-auto pe-3'
            : 'h-[400px] sm:h-[550px]'
        }`}
      >
        {!error ? (
          <BaseTable
            body={resultData.slice(0, resultData.length - 1)}
            header={checkPermissionHeaderItem(
              userPermissions,
              getScanFileHeader(evidencePermissions)
            )}
            loading={isLoading}
            pagination={paginationProps}
            onClick={handelClickRow}
            isMobile={width <= 760}
          />
        ) : (
          // Remember to handel the error of the component
          <p className="flex items-center justify-center">{error}</p>
        )}
      </div>
    </div>
  );
}
