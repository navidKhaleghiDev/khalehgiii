import { useState } from "react";
import { LoadingSpinner } from "@ui/molecules/Loading";
import { NoResult } from "@ui/molecules/NoResult";
import { UbaCard } from "./UbaCard";
import useSWR from "swr";
import { http_analyses } from "@src/services/http";
import { IResponsePagination } from "@src/types/services";
import Pagination from "@ui/molecules/Pagination";
import { Typography } from "@ui/atoms";
import { E_UBA_LIST_PAGINATION } from "@src/services/analyze/endpoint";
import { IUba } from "@src/services/analyze/types";
import { StringifyProperties } from "@src/types/global";
import { SearchInput } from "@ui/atoms/Inputs/SearchInput";

const PAGE_SIZE = 8;

const headerItem: StringifyProperties<IUba> = {
  id: "",
  created_at: "",
  updated_at: "تاریخ بروز رسانی",
  username: "نام کاربر",
  file_names: "نام های تغییر یافته",
  original_file_name: "نام اصلی",
  file_hash: "هش فایل",
  transmission_type: "اکشن",
  is_ban: "مسدود شده",
  malbehave_count: "رفتار غیر مجاز",
};

export function UbaAsList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useSWR<IResponsePagination<IUba>>(
    E_UBA_LIST_PAGINATION({
      page: currentPage,
      pageSize: PAGE_SIZE,
      filter: `search=${search}`,
    }),
    http_analyses.fetcherSWR,
    {
      revalidateOnFocus: false,
      errorRetryCount: 0,
    }
  );

  const listUba = data?.data?.results ?? [];
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
        <SearchInput
          name="search"
          value={search}
          onChange={setSearch}
          className="w-1/4"
        />
        <Typography size="h4" color="teal" className="text-left w-full">
          :UBA List
        </Typography>
      </div>
      <UbaCard uba={headerItem} isHeader />
      {isLoading ? (
        <LoadingSpinner />
      ) : listUba.length > 0 ? (
        listUba.map((item) => <UbaCard key={item.id} uba={item} />)
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
    </div>
  );
}
