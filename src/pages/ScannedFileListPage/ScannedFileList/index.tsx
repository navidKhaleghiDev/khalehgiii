/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useState, useRef } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IScannedFile } from '@src/services/analyze/types';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { Modal } from '@ui/molecules/Modal';
import { BaseTable } from '@ui/atoms/BaseTable';
import { scannedFileHeaderItem } from '@src/pages/ScannedFileListPage/ScannedFileList/constants/scannedFileHeaderItem';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import {
  API_ANALYZE_DOWNLOAD_FILE,
  API_ANALYZE_SCAN_STATUS_UPDATE,
} from '@src/services/analyze';
import { toast } from 'react-toastify';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { useUserPermission } from '@src/helper/hooks/usePermission';

import { DetailsContentModal } from './DetailsContentModal';

const PAGE_SIZE = 8;
const PAGE = 1;

type ScannedFileListProp = {
  id: string;
};

export function ScannedFileList({ id }: ScannedFileListProp) {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [cleanStatusModal, setCleanStatusModal] = useState(false);
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();
  const downloadLinkRef = useRef(null);
  const { t } = useTranslation();
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
      setOpenDetailsModal(true);
    }
  };

  const paginationProps = {
    countPage,
    currentPage,
    totalPages: Math.ceil(countPage / PAGE_SIZE),
    onPageChange: handlePageChange,
  };

  return (
    <div className={`w-full ${isLoading ? 'loading' : ''}`}>
      <a ref={downloadLinkRef} style={{ display: 'none' }} />
      <BaseTable<IScannedFile>
        loading={isLoading}
        headers={checkPermissionHeaderItem(
          userPermissions,
          scannedFileHeaderItem(evidencePermissions)
        )}
        bodyList={listDaas}
        onClick={handleOpenModal}
        pagination={paginationProps}
      />
      <Modal
        open={openDetailsModal}
        setOpen={setOpenDetailsModal}
        type="success"
        content={<DetailsContentModal scannedFile={activeScannedFile} />}
      />
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
