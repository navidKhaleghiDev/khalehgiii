import { useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { UserDaAsCard } from "./UserDaAsCard";
import { ETimeLimitDuration, IUser } from "@src/services/users/types";
import { IDaAs } from "@src/services/users/types";

import useSWR from "swr";
import { http } from "@src/services/http";
import { IServerResponseList } from "@src/types/services";
import { E_USERS_DAAS } from "@src/services/users/endpoint";
import Pagination from "@ui/molecules/Pagination";
import { Typography } from "@ui/atoms";

const LIMIT_DESKTOP_LIST = 8;

const headerItem: IDaAs = {
  email: "نام کاربر",
  http_port: "پورت http",
  https_port: "پورت https",
  created_at: "تاریخ ایجاد",
  last_uptime: "string",
  time_limit_duration: ETimeLimitDuration.DAILY,
  time_limit_value_in_hour: 1,
  is_running: "وضعیت کاربر",
  usage_in_minute: "زمان استفاده شده",
  can_upload_file: "تنظیمات دسترسی",
  can_download_file: false,
  clipboard_down: false,
  clipboard_up: false,
};

type PropsType = { user: IUser | null };
export function UsersDaAsList({ user }: PropsType) {
  const [currentPage, setCurrentPage] = useState(1);
  // const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR<IServerResponseList<IDaAs[]>>(
    user
      ? E_USERS_DAAS({
          page: currentPage,
          pageSize: LIMIT_DESKTOP_LIST,
          // filter: `search=${search}`,
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
          totalPages={Math.round(countPage / LIMIT_DESKTOP_LIST)}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
