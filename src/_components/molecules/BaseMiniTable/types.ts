export type BaseMiniTableProps<BodyType> = {
  header: Record<string, string>;
  body: BodyType[];
  loading: boolean;
  pagination:
};

export type IdItem = {
  id: string | number;
  [key: string]: any;
};
