import { useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { ScannedFileCard } from "./ScannedFileCard";
import useSWR from "swr";
import { http_analyses } from "@src/services/http";
import { IResponsePagination } from "@src/types/services";
import Pagination from "@ui/molecules/Pagination";
import { Typography } from "@ui/atoms";
import { IScannedFile } from "@src/services/analyze/types";
import { StringifyProperties } from "@src/types/global";
import { useParams } from "react-router-dom";
import { E_ANALYZE_SCAN_PAGINATION } from "@src/services/analyze/endpoint";
import { Modal } from "@ui/molecules/Modal";
import { DetailsContentModal } from "./DetailsContentModal";
import { SearchInput } from "@ui/atoms/Inputs/SearchInput";

const LIMIT_PAGE_SIZE = 8;

const headerItem: StringifyProperties<IScannedFile> = {
  id: "جزییات بیشتر",
  file_name: "نام فایل",
  file_size_in_bytes: "",
  file_content_type: "تایپ",
  username: "Radmehr.h@test1.local",
  yara_scanner_status: "نتیجه / وضعیت اسکنر YARA",
  clamav_scanner_status: "نتیجه / وضعیت اسکنر CLAMAV",
  yara_scan_summary: "",
  yara_scan_result: "نتیجه اسکن YARA",
  yara_error_message: "",
  clamav_scan_summary: "",
  clamav_scan_result: "نتیجه اسکن CLAMAV",
  antiviruses_scan_result: "نتیجه اسکن SANDBOX",
  antiviruses_scanner_status: "نتیجه / وضعیت اسکنر SANDBOX",
  antiviruses_scan_sandbox_summary: "",
  antiviruses_scan_vendors_summary: "",
  antiviruses_last_analysis_stats: "",
  antiviruses_crowdsourced_ids_results: "",
  antiviruses_error_message: "",
  clamav_error_message: "",
  created_at: "",
};

export function ScannedFileList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();

  const { id } = useParams();

  const { data, isLoading } = useSWR<IResponsePagination<IScannedFile>>(
    id
      ? E_ANALYZE_SCAN_PAGINATION(id, {
          page: currentPage,
          pageSize: LIMIT_PAGE_SIZE,
          filter: `search=${search}`,
        })
      : null,
    http_analyses.fetcherSWR
  );

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count ?? 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleOpenModal = (item: IScannedFile) => {
    setActiveScannedFile(item);
    setOpenDetailsModal(true);
  };

  // const handleOnChangeSearch = ({
  //   target: { value },
  // }: React.ChangeEvent<HTMLInputElement>) => {
  //   setSearch(value);
  // };

  return (
    <div className="w-full p-4">
      <div className="flex items-center justify-between">
        {/* <BaseInput
          name="search"
          className="w-1/3"
          id="search"
          pureValue={search}
          pureOnChange={handleOnChangeSearch}
          placeholder="جستجو کنید"
        /> */}
        <Typography size="h4" color="teal">
          {id}
        </Typography>

        <SearchInput
          name="search"
          value={search}
          onChange={setSearch}
          className="w-1/4"
        />
      </div>
      <ScannedFileCard scannedFile={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listDaas.length > 0 ? (
        listDaas.map((item) => (
          <ScannedFileCard
            key={item.id}
            scannedFile={item}
            onOpenDetailModal={() => handleOpenModal(item)}
          />
        ))
      ) : (
        <NoResult />
      )}
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / LIMIT_PAGE_SIZE)}
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
