import { useCallback, useState } from 'react';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { NoResult } from '@ui/molecules/NoResult';
import useSWR from 'swr';
import { HTTP_ANALYSES } from '@src/services/http';
import { IResponsePagination } from '@src/types/services';
import Pagination from '@ui/molecules/Pagination';
import { Typography } from '@ui/atoms';
import { IScannedFile } from '@src/services/analyze/types';
import { StringifyProperties } from '@src/types/global';
import { useParams } from 'react-router-dom';
import { E_ANALYZE_SCAN_PAGINATION } from '@src/services/analyze/endpoint';
import { Modal } from '@ui/molecules/Modal';
import { SearchInput } from '@ui/atoms/Inputs/SearchInput';
import { debounce } from 'lodash';
import { useTranslation } from 'react-i18next';
import { DetailsContentModal } from './DetailsContentModal';
import { ScannedFileCard } from './ScannedFileCard';

const PAGE_SIZE = 8;
const PAGE = 1;

export function ScannedFileList() {
  const { t } = useTranslation();
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>('');
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();
  const { id } = useParams();

  const headerItem: StringifyProperties<IScannedFile> = {
    id: t('table.moreDetail'),
    file_name: t('table.fileName'),
    file_size_in_bytes: '',
    file_content_type: t('table.type'),
    username: 'Radmehr.h@test1.local',
    yara_scanner_status: `${t('table.resultScanerStatus')}YARA`,
    clamav_scanner_status: `${t('table.resultScanerStatus')}CLAMAV`,
    yara_scan_summary: '',
    yara_scan_result: 'نتیجه اسکن YARA',
    yara_error_message: '',
    clamav_scan_summary: '',
    clamav_scan_result: 'نتیجه اسکن CLAMAV',
    antiviruses_scan_result: 'نتیجه اسکن SANDBOX',
    antiviruses_scanner_status: `${t('table.resultScanerStatus')}SANDBOX`,
    antiviruses_scan_sandbox_summary: '',
    antiviruses_scan_vendors_summary: '',
    antiviruses_last_analysis_stats: '',
    antiviruses_crowdsourced_ids_results: '',
    antiviruses_error_message: '',
    clamav_error_message: '',
    created_at: '',
  };

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

  const handleOpenModal = (item: IScannedFile) => {
    setActiveScannedFile(item);
    setOpenDetailsModal(true);
  };

  let scanedFileTable;

  if (isLoading) {
    scanedFileTable = <LoadingSpinner />;
  } else if (listDaas.length > 0) {
    scanedFileTable = listDaas.map((item) => (
      <ScannedFileCard
        key={item.id}
        scannedFile={item}
        onOpenDetailModal={() => handleOpenModal(item)}
      />
    ));
  } else {
    scanedFileTable = <NoResult />;
  }

  return (
    <div className={`w-full p-4  ${isLoading ? 'loading' : ''}`}>
      <div className="flex items-center justify-between">
        <SearchInput
          name="search-scanned-file"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
        <Typography size="h4" color="teal">
          {id}
        </Typography>
      </div>
      <ScannedFileCard scannedFile={headerItem} isHeader />
      {scanedFileTable}
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
