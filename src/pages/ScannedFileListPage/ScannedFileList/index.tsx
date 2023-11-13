import { useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { ScannedFileCard } from "./ScannedFileCard";
import useSWR from "swr";
import { http_analyses } from "@src/services/http";
import { ISwrResponse } from "@src/types/services";
import Pagination from "@ui/molecules/Pagination";
import { Typography } from "@ui/atoms";
import { IScannedFile } from "@src/services/analyze/types";
import { StringifyProperties } from "@src/types/global";
import { useParams } from "react-router-dom";
import { E_ANALYZE_SCAN } from "@src/services/analyze/endpoint";
import { Modal } from "@ui/molecules/Modal";
import { DetailsContentModal } from "./DetailsContentModal";

const LIMIT_DESKTOP_LIST = 8;

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
  // const [search, setSearch] = useState("");
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [activeScannedFile, setActiveScannedFile] = useState<IScannedFile>();

  const { id } = useParams();

  const { data, isLoading } = useSWR<ISwrResponse<IScannedFile[]>>(
    id ? E_ANALYZE_SCAN(id) : null,
    http_analyses.fetcherSWR
  );

  const listDaas = data?.data ?? [];
  const countPage = 0;

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
      <div className="flex items-center">
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
          totalPages={Math.round(countPage / LIMIT_DESKTOP_LIST)}
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
