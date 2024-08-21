/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import { useCallback, useState, useRef } from 'react';
import useSWR from 'swr';
import { useTranslation } from 'react-i18next';
import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import { IScannedFile } from '@src/services/analyze/types';
import { useParams } from 'react-router-dom';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { Modal } from '@ui/molecules/Modal';
import { debounce } from 'lodash';
import { BaseTable } from '@ui/atoms/BaseTable';
import { scannedFileHeaderItem } from '@src/constants/tableHeaders/scannedFileHeaderItem';
import { OnClickActionsType } from '@ui/atoms/BaseTable/types';
import { TSearchBar } from '@ui/atoms/BaseTable/components/BaseTableSearchBar/types';
import { API_ANALYZE_DOWNLOAD_FILE } from '@src/services/analyze';
import { toast } from 'react-toastify';
import { checkPermissionHeaderItem } from '@ui/atoms/BaseTable/components/utils/CheckPermissionHeaderItem';
import { useUserPermission } from '@src/helper/hooks/usePermission';

import { DetailsContentModal } from './DetailsContentModal';

const PAGE_SIZE = 8;
const PAGE = 1;

export function ScannedFileList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();
  const downloadLinkRef = useRef(null);
  const { id } = useParams();
  const { t } = useTranslation();
  const userPermissions = useUserPermission();

  const { data, isLoading } = useSWR<IResponsePagination<IScannedFile>>(
    id
      ? E_ANALYZE_SCAN_PAGINATION(id, {
          page: currentPage,
          pageSize: PAGE_SIZE,
          filter: `search=${encodeURIComponent(filterQuery)}`,
        })
      : null,
    HTTP_ANALYSES.fetcherSWR
  );

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count ?? 0;
  const evidencePermissions =
    listDaas[listDaas.length - 1]?.evidence_permission;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetFilterQuery = useCallback(
    debounce((query: string) => {
      setCurrentPage(PAGE);
      setFilterQuery(query);
    }, 1000),
    []
  );

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilterQuery(event.target.value);
  };

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal: OnClickActionsType<IScannedFile> = (action, item) => {
    if (action === 'download') {
      downloadFile(item);
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

  const searchBarProps: TSearchBar = {
    name: 'search',
    value: filterQuery,
    handleSearchInput: handleFilterChange,
    componentProps: {
      type: 'typography',
      label: id,
    },
  };

  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
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
        searchBar={searchBarProps}
      />
      <Modal
        open={openDetailsModal}
        setOpen={setOpenDetailsModal}
        type="success"
        content={<DetailsContentModal scannedFile={activeScannedFile} />}
      />
    </div>
  );
}
