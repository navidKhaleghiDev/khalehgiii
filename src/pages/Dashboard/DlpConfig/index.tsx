import { IconButton } from "@ui/atoms/BaseButton";
import plusIcon from "@iconify-icons/ph/plus";
import { useState } from "react";
import useSWR from "swr";
import { IResponsePagination } from "@src/types/services";
import { IFileType } from "@src/services/config/types";
import { http } from "@src/services/http";
import { E_DAAS_CONFIG_LIST_PAGINATION } from "@src/services/config/endpoint";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { FileTypeCard } from "./FileTypeCard";
import { StringifyProperties } from "@src/types/global";
import { ActionOnClickActionsType } from "./FileTypeCard/types";
import { NoResult } from "@ui/molecules/NoResult";
import Pagination from "@ui/molecules/Pagination";
import { Modal } from "@ui/molecules/Modal";
import { UpdateFileTypeModal } from "./UpdateFileTypeModal";
import { API_DELETE_FILE_TYPE } from "@src/services/config";
import { toast } from "react-toastify";
import ToolTip from "@ui/atoms/Tooltip";
import { SearchInput } from "@ui/atoms/Inputs/SearchInput";

const LIMIT_DAAS_CONFIG_LIST = 3;

const headerItem: StringifyProperties<IFileType> = {
  id: "",
  file_type: "تایپ فایل",
  allowed_for_upload: "مجاز برای آپلود",
  allowed_for_download: "مجاز برای دانلود",
  is_active: "فعال",
  created_at: "تاریخ ایجاد",
  updated_at: "تاریخ بروزرسانی",
};

export function DlpConfig() {
  const [activeFileType, setActiveFileType] = useState<Partial<IFileType>>();

  const [deleteModal, setDeleteModal] = useState(false);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);

  const [loadingButtonModal, setLoadingButtonModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, mutate, isLoading } = useSWR<IResponsePagination<IFileType>>(
    E_DAAS_CONFIG_LIST_PAGINATION({
      page: currentPage,
      pageSize: LIMIT_DAAS_CONFIG_LIST,
      filter: `search=${search}`,
    }),
    http.fetcherSWR
  );

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const listWhiteList = data?.data?.results ?? [];

  const countPage = data?.data?.count || 0;

  const handleOnDeleteFileType = async () => {
    if (!activeFileType) return;
    setLoadingButtonModal(true);

    await API_DELETE_FILE_TYPE(activeFileType.id as number)
      .then(() => {
        mutate();
        toast.success("با موفقیت حذف شد");
        setDeleteModal(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButtonModal(false);
      });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCloseUpdateModal = (isMutate?: boolean) => {
    if (isMutate) {
      mutate();
    }
    setOpenUpdateModal(false);
  };

  function handleOnClickActions(
    action: ActionOnClickActionsType,
    fileType?: StringifyProperties<IFileType> | IFileType
  ): any {
    setActiveFileType(fileType as IFileType);

    if (action === "delete") {
      setDeleteModal(true);
      return;
    }

    if (action === "edit") {
      setOpenUpdateModal(true);
      return;
    }

    // if (daas !== undefined && typeof daas !== "string") {
    //   setActionOnClick(action);
    //   setActiveDaas(daas);
    //   setDeleteModal(true);
    // }
  }

  const handleCreateNewType = () => {
    activeFileType && setActiveFileType(undefined);
    setOpenUpdateModal(true);
  };
  return (
    <div className="w-full p-4">
      <div className="flex justify-between items-center">
        <SearchInput
          name="search"
          value={search}
          onChange={setSearch}
          className="w-1/4"
        />
        <ToolTip tooltip="اضافه کردن تایپ جدید" position="right">
          <IconButton
            icon={plusIcon}
            color="teal"
            size="lg"
            onClick={handleCreateNewType}
          />
        </ToolTip>
      </div>
      <FileTypeCard fileType={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listWhiteList.length > 0 ? (
        listWhiteList.map((item) => (
          <FileTypeCard
            key={item.id}
            fileType={item}
            onClickActions={handleOnClickActions}
          />
        ))
      ) : (
        <NoResult />
      )}
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / LIMIT_DAAS_CONFIG_LIST)}
          onPageChange={handlePageChange}
        />
      )}
      <Modal
        open={deleteModal}
        setOpen={setDeleteModal}
        type="error"
        title="از انجام این کار مطمئن هستید؟"
        buttonOne={{
          label: "بله",
          onClick: handleOnDeleteFileType,
          loading: loadingButtonModal,
        }}
        buttonTow={{
          label: "خیر",
          onClick: () => setDeleteModal(false),
          color: "red",
        }}
      />
      <Modal
        open={openUpdateModal}
        setOpen={setOpenUpdateModal}
        type="success"
        content={
          <UpdateFileTypeModal
            handleClose={handleCloseUpdateModal}
            fileType={activeFileType}
          />
        }
      />
    </div>
  );
}
