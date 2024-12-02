export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout((_error: any, data: unknown) => resolve(data), time);
  });
};

let id = 0;
export function generateUniqueId(): string {
  id += 1;
  return id.toString(36);
}

export const createAPIEndpoint = ({
  endPoint,
  currentPage,
  pageSize,
  filterQuery,
  lockFilter,
  onlineFilter,
}: any): string => {
  const params = new URLSearchParams({
    page: String(currentPage),
    page_size: String(pageSize),
    search: encodeURIComponent(filterQuery),
  });

  let url = `${endPoint}?${params}`;

  if (lockFilter) {
    url += `&is_lock=true`;
  }

  if (onlineFilter) {
    url += `&is_running=true`;
  }

  return url;
};
