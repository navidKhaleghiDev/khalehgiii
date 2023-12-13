import { useCallback, useState } from "react";
import useSWR from "swr";
import { IResponsePagination } from "@src/types/services";
import { IDaasConfig } from "@src/services/config/types";
import { http } from "@src/services/http";
import { E_DAAS_CONFIGS } from "@src/services/config/endpoint";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { DlpConfigCard } from "./DlpConfigCard";
import { StringifyProperties } from "@src/types/global";
import { ActionOnClickActionsType } from "./DlpConfigCard/types";
import { NoResult } from "@ui/molecules/NoResult";
import Pagination from "@ui/molecules/Pagination";
import { Modal } from "@ui/molecules/Modal";
import { SettingDaasConfigModal } from "./SettingDaasConfigModal";
import { createAPIEndpoint } from "@src/helper/utils";
import { debounce } from "lodash";
import { SearchInput } from "@ui/atoms/Inputs/SearchInput";

const PAGE_SIZE = 8;
const PAGE = 1;

const headerItem: StringifyProperties<IDaasConfig> = {
  id: "",
  can_upload_file: "آپلود",
  can_download_file: "دانلود",
  clipboard_up: "کلیپبورد از کلاینت به سرور",
  clipboard_down: "کلیپبورد از سرور به کلاینت",
  webcam_privilege: "وب کم",
  microphone_privilege: "میکروفن",
  time_limit_duration: "زمان مجاز دسترسی",
  time_limit_value_in_hour: "",
  max_transmission_upload_size: "سایز آپلود",
  max_transmission_download_size: "سایز دانلود",
  is_globally_config: "",
};

export function DaasConfigList() {
  const [currentPage, setCurrentPage] = useState<number>(PAGE);
  const [filterQuery, setFilterQuery] = useState<string>("");
  const [activeDaasConfig] = useState<Partial<IDaasConfig>>();
  const [openSettingModal, setOpenSettingModal] = useState(false);

  const endpoint = createAPIEndpoint({
    endPoint: E_DAAS_CONFIGS,
    pageSize: PAGE_SIZE,
    currentPage,
    filterQuery,
  });
  const { data, isLoading, mutate } = useSWR<IResponsePagination<IDaasConfig>>(
    endpoint,
    http.fetcherSWR
  );

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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const listDaasConfig = data?.data?.results ?? [];

  const countPage = data?.data?.count || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseModal = () => {};

  function handleOnClickActions(
    action: ActionOnClickActionsType,
    daasConfig?: StringifyProperties<IDaasConfig> | IDaasConfig
  ): any {
    if (action === "mutate") {
      mutate();
      return;
    }
    console.log({ daasConfig });
  }

  return (
    <div className="w-full p-4">
      <div className="flex items-center">
        <SearchInput
          name="search"
          value={filterQuery}
          onChange={handleFilterChange}
          className="w-1/4"
        />
      </div>
      <DlpConfigCard daasConfig={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listDaasConfig.length > 0 ? (
        listDaasConfig.map((item) => (
          <DlpConfigCard
            key={item.id}
            daasConfig={item}
            onClickActions={handleOnClickActions}
          />
        ))
      ) : (
        <NoResult />
      )}
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / PAGE_SIZE)}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        open={openSettingModal}
        setOpen={setOpenSettingModal}
        type="success"
        content={
          <SettingDaasConfigModal
            handleClose={handleCloseModal}
            daasConfig={activeDaasConfig as IDaasConfig}
          />
        }
      />
    </div>
  );
}
