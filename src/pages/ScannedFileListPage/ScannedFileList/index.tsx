import { useCallback, useState } from 'react';
import useSWR from 'swr';
import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import Pagination from '@ui/molecules/Pagination';
import { Typography } from '@ui/atoms';
import { IScannedFile } from '@src/services/analyze/types';
import { useParams } from 'react-router-dom';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { Modal } from '@ui/molecules/Modal';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { BaseTable } from '@ui/atoms/BaseTable';
import { scannedFileHeaderItem } from '@src/constants/tableHeaders/scannedFileHeaderItem';
import { DetailsContentModal } from './DetailsContentModal';

const PAGE_SIZE = 8;
const PAGE = 1;

export function ScannedFileList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();
  const { id } = useParams();
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

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count ?? 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (_, item: IScannedFile) => {
    setActiveScannedFile(item);
    setOpenDetailsModal(true);
  };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        <SearchInput
          name="search"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
        <Typography size="h4" color="teal">
          {id}
        </Typography>
      </div>
      <BaseTable
        header={scannedFileHeaderItem}
        body={listDaas}
        onClick={handleOpenModal}
      />
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / PAGE_SIZE)}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        open={openDetailsModal}
        setOpen={setOpenDetailsModal}
        type="success"
        content={<DetailsContentModal scannedFile={activeScannedFile} />}
      />
    </div>
  );
}
