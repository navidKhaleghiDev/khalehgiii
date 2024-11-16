import DateObject from 'react-date-object';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import useSWR from 'swr';

import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IScannedFile } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';
import { MultiDatePicker } from '@redesignUi/atoms/Inputs/DatePicker';
import {
  API_ANALYZE_DOWNLOAD_FILE,
  API_ANALYZE_SCAN_STATUS_UPDATE,
} from '@src/services/analyze';
import { checkPermissionHeaderItem } from '@redesignUi/molecules/BaseTable/components/utils/CheckPermissionHeaderItem';
import { Modal } from '@redesignUi/molecules/Modal';
import { BaseTable } from '@redesignUi/molecules/BaseTable';
import { useUserPermission } from '@src/helper/hooks/usePermission';
import { useWindowDimensions } from '@src/helper/hooks/useWindowDimensions';
import { MultiDatePickerProps } from '@redesignUi/atoms/Inputs/DatePicker/types';

import {
  scannedFileHeaderWithOutPermission,
  scannedFileHeaderWithPermission,
} from './constants/scannedFileHeaderItem';

const PAGE_SIZE = 8;
const PAGE = 1;

type ScannedFileListProp = {
  userEmail: string;
};

export function ScannedFileList({ userEmail }: ScannedFileListProp) {
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();
  const [cleanStatusModal, setCleanStatusModal] = useState(false);
  const [dateRange, setRangeDate] = useState<DateObject[] | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [loading, setLoading] = useState<boolean>(false);

  const userPermissions = useUserPermission();
  const { width } = useWindowDimensions();
  const { t } = useTranslation();

  const handleDatePickerFilter: MultiDatePickerProps['onChange'] = (date) => {
    setRangeDate(date);
    console.log(dateRange);
  };

  // DaAs users scan reports
  const { data, isLoading, mutate, error } = useSWR<
    IResponsePagination<IScannedFile>
  >(
    userEmail
      ? E_ANALYZE_SCAN_PAGINATION(userEmail, {
          page: currentPage,
          pageSize: PAGE_SIZE,
        })
      : null,
    HTTP_ANALYSES.fetcherSWR
  );

  const scanFilesList = data?.data?.results ?? [];
  const countPage = data?.data?.count ?? 0;
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
      <div className="text-start my-5">
        <MultiDatePicker
          id="recordFilter"
          name="recordFilter"
          onChange={(date) => handleDatePickerFilter(date)}
        />
      </div>
      <div className="[&_thead]:bg-gray-100">
        {!error ? (
          <BaseTable
            body={scanFilesList.slice(0, scanFilesList.length - 1)}
            header={checkPermissionHeaderItem(userPermissions, scanFileHeader)}
            loading={isLoading}
            pagination={paginationProps}
            onClick={handleOpenModal}
            isMobile={width <= 760}
          />
        ) : (
          // Remember to handel the error of the component
          <p className="flex items-center justify-center">{error}</p>
        )}
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
