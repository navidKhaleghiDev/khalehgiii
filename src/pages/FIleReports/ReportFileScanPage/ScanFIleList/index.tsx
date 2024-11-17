import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useSWR from 'swr';

import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IScannedFile } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { API_ANALYZE_DOWNLOAD_FILE } from '@src/services/analyze';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';

import {
  scannedFileHeaderWithOutPermission,
  scannedFileHeaderWithPermission,
} from './constants/scannedFileHeaderItem';
import { ScanFileDatePicker } from './ScanFIleDatePicker';

const PAGE_SIZE = 8;
const PAGE = 1;

export function ScannedFileList({ userEmail }: { userEmail: string }) {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);

  const userPermissions = useUserPermission();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  // Daas user scan reports
  const { data, isLoading, error } = useSWR<IResponsePagination<IScannedFile>>(
    E_ANALYZE_SCAN_PAGINATION(userEmail, {
      page: currentPage,
      pageSize: PAGE_SIZE,
    }),
    HTTP_ANALYSES.fetcherSWR
  );
  const scanFilesList = data?.data?.results ?? [];
  const countPage = data?.data?.count ?? 0;
  // Daas user download file permission
  const evidencePermissions =
    scanFilesList[scanFilesList.length - 1]?.evidence_permission;

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

  // There is no item for updating the scanFile
  // const cleanStatus = async () => {
  //   if (activeScannedFile) {
  //     setLoading(true);
  //     await API_ANALYZE_SCAN_STATUS_UPDATE(activeScannedFile)
  //       .then(() => {
  //         mutate();
  //       })
  //       .catch((err) => {
  //         toast.error(err);
  //       })
  //       .finally(() => setLoading(false));
  //   }
  // };

  const handelClickRow: OnClickActionsType<IScannedFile> = (action, item) => {
    if (action === 'download') downloadFile(item);

    // There is no item for editing the items
    // } else if (action === 'edit') {
    //   setActiveScannedFile({ ...item, scan_result: 'CLEAN' } as IScannedFile);
    //   setCleanStatusModal(true);
    // } else {
    //   setActiveScannedFile(item as IScannedFile);
    // }
  };

  // Table data
  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: (page: number) => setCurrentPage(page),
    paginationLabel: t('table.file'),
    allItems: countPage,
    itemsPer: scanFilesList.length,
  };
  const scanFileHeader = evidencePermissions
    ? scannedFileHeaderWithPermission
    : scannedFileHeaderWithOutPermission;

  return (
    <div className="w-full">
      <ScanFileDatePicker />
      <div className="[&_thead]:bg-gray-100">
        {!error ? (
          <BaseTable
            body={scanFilesList.slice(0, scanFilesList.length - 1)}
            header={checkPermissionHeaderItem(userPermissions, scanFileHeader)}
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
      {/* This modal is for the old design */}
      {/* <Modal
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
      /> */}
    </div>
  );
}
