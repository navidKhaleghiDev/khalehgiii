export type BaseMiniTableProps<BodyType> = {
  header: Record<string, string>;
  body: BodyType[];
  loading: boolean;
};

export type IdItem = {
  id: string | number;
  [key: string]: any;
};
