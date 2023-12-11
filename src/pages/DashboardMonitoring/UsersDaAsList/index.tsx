import { useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { UserDaAsCard } from "./UserDaAsCard";
import { ETimeLimitDuration, IUser } from "@src/services/users/types";
import { IDaAs } from "@src/services/users/types";

import useSWR from "swr";
import { http } from "@src/services/http";
import { IResponsePagination } from "@src/types/services";
import { E_USERS_DAAS } from "@src/services/users/endpoint";
import Pagination from "@ui/molecules/Pagination";
import { Typography } from "@ui/atoms";
import { IHeaderDaasCard } from "@src/pages/DashboardDesktopList/DaAsList/types";

const LIMIT_DESKTOP_LIST = 8;

const headerItem: IHeaderDaasCard = {
  id: "مشاهده رفتار کاربر",
  email: "نام کاربر",
  http_port: "پورت http",
  https_port: "پورت https",
  created_at: "تاریخ ایجاد",
  daas_configs: {
    time_limit_duration: ETimeLimitDuration.DAILY,
    time_limit_value_in_hour: "",
    can_download_file: "",
    clipboard_down: "",
    clipboard_up: "",
    webcam_privilege: "",
    microphone_privilege: "",
    max_transmission_download_size: "",
    max_transmission_upload_size: "",
    can_upload_file: "تنظیمات دسترسی",
    is_globally_config: "",
  },
  forbidden_upload_files: "",
  forbidden_download_files: "",
  last_uptime: "تعداد اسکن",
  is_running: "وضعیت کاربر",
  usage_in_minute: "زمان استفاده شده",
  extra_allowed_download_files: "",
  extra_allowed_upload_files: "",
  allowed_files_type_for_download: "",
  allowed_files_type_for_upload: "",
  daas_version: "نسخه دسکتاپ",
  is_lock: "دسکتاپ",
};

type PropsType = { user: IUser | null };
export function UsersDaAsList({ user }: PropsType) {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading } = useSWR<IResponsePagination<IDaAs>>(
    user
      ? E_USERS_DAAS({
          page: currentPage,
          pageSize: LIMIT_DESKTOP_LIST,
          // filter: `search=${encodeURIComponent(search)}`,
        })
      : null,
    http.fetcherSWR,
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
    }
  );

  const listDaas = data?.data?.results ?? [];
  const countPage = data?.data?.count || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          لیست کاربران:
        </Typography>
      </div>
      <UserDaAsCard daas={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listDaas.length > 0 ? (
        listDaas.map((item) => <UserDaAsCard key={item.id} daas={item} />)
      ) : (
        <NoResult />
      )}
      {!!countPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(countPage / LIMIT_DESKTOP_LIST)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
