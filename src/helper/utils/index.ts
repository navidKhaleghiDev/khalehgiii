export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout((_error, data) => resolve(data), time);
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
}: any): string => {
  const params = new URLSearchParams({
    page: String(currentPage),
    page_size: String(pageSize),
    search: encodeURIComponent(filterQuery),
  });
  return `${endPoint}?${params}`;
};
