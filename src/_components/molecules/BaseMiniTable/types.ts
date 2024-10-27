export type BaseMiniTableProps<BodyType> = {
  header: Record<string, string>;
  body: BodyType[];
  loading: boolean;
  pagination: Pagination;
  title: string;
};

export type IdItem = {
  id: string | number;
  [key: string]: any;
};
export type Pagination = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};
