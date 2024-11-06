import { PermissionsCodeName } from '@src/types/permissions';
import { StringifyProperties } from '@src/types/global';
import { IconButtonProps } from '@redesignUi/atoms/BaseButton';

export type BaseTableProps<BodyType> = {
  header: HeaderTable[];
  body: BodyType[];
  loading: boolean;
  isMobile?: boolean;
  onClick?: OnClickActionsType<BodyType>;
  pagination: Pagination;
};

interface HeaderTableBase {
  isCollapsed?: boolean;
  isMobileCollapsed?: boolean;
  action?: any;
  component?: any;
  function?: any;
  id: string | string[];
  label?: TableLabel;
  class?: string;
  type: TableType;
  permission?: PermissionsCodeName | PermissionsCodeName[];
}
export type HeaderTable = HeaderTableBase &
  (
    | { type: Exclude<TableType, 'avatar'> }
    | { type: 'avatar'; isActive: string; email: string }
  ) &
  (
    | { type: Exclude<TableType, 'none'> }
    | {
        type: 'none';
        textTransform?:
          | 'uppercase'
          | 'lowercase'
          | 'capitalize'
          | 'normal-case';
      }
  ) &
  ({ type: Exclude<TableType, 'menu'> } | MenuHeader) &
  (
    | { type: Exclude<TableType, 'date'> }
    | { type: 'date'; render?: 'date' | 'day' | 'hour' }
  );

export type MenuHeader = {
  type: 'menu';
  menu: MenuType[];
  tooltip: TableLabel;
  icon?: IconButtonProps['icon'];
};

export type MenuType = {
  action: ActionOnClickActionsType;
  icon: IconButtonProps['icon'];
  color?: IconButtonProps['color'];
  title: TableLabel;
  size?: IconButtonProps['size'];
  permission?: PermissionsCodeName;
};

export type BaseTableHeaderProps = Pick<BaseTableProps<IdItem>, 'header'> & {
  collapse?: boolean;
};

export type BaseTableBodyProps = Pick<
  BaseTableProps<IdItem>,
  'header' | 'onClick' | 'body' | 'isMobile'
> & {
  collapseHeader: HeaderTable[];
};

export type BaseTableRowProps<BodyType> = Pick<
  BaseTableProps<IdItem>,
  'header' | 'onClick' | 'body' | 'isMobile'
> & {
  collapseHeader: HeaderTable[];
  row: BodyType;
  index: number;
};
export type BaseTableRenderComponentProps<BodyType> = Pick<
  BaseTableProps<IdItem>,
  'onClick'
> & {
  row: BodyType;
  header: HeaderTable;
};

export type BaseTableCollapseDesktopProps<BodyType> = Omit<
  BaseTableRenderComponentProps<BodyType>,
  'header'
> & {
  header: HeaderTable[];
};
export type BaseTableCollapseMobileProps<BodyType> =
  BaseTableCollapseDesktopProps<BodyType>;

export type BaseTableCollapseProps<BodyType> = Omit<
  BaseTableRowProps<BodyType>,
  'index' | 'body'
>;
export type BaseTableActionCellProps<BodyType> = Omit<
  BaseTableRenderComponentProps<BodyType>,
  'body' | 'isMobile'
>;

export type BaseTableMenuCellProps<BodyType extends IdItem> =
  BaseTableNoneCellProps<BodyType>;

export type BaseTableComponentCellProps<BodyType> = Pick<
  BaseTableRowProps<BodyType>,
  'row' | 'onClick'
> & {
  header: HeaderTable;
  id: HeaderTable['id'];
  row: BodyType;
};

export type BaseTableNoneCellProps<BodyType extends IdItem> = Pick<
  BaseTableRowProps<BodyType>,
  'row' | 'onClick'
> & {
  header: HeaderTable;
  id: HeaderTable['id'];
};

export type BaseTableAvatarCellProps<BodyType extends IdItem> =
  BaseTableNoneCellProps<BodyType>;

export type BaseTableDataCellProps<BodyType extends IdItem> = Omit<
  BaseTableNoneCellProps<BodyType>,
  'onClick' | 'header'
> & {
  header?: HeaderTable;
};

export type CategorizedData = {
  mobile: HeaderTable[];
  desktop: HeaderTable[];
  nonCollapsedMobile: HeaderTable[];
  nonCollapsedDesktop: HeaderTable[];
};

export type Pagination = {
  countPage: number;
  currentPage: number;
  totalPages: number;
  paginationLabel: string;
  allItems: number;
  itemsPer: number;
  onPageChange: (page: number) => void;
};
type TableLabel = `table.${string}`;

export type IdItem = {
  id: string | number;
  [key: string]: any;
};

// export type IComponentsHeader = {
//   [key in TTableType]: JSX.Element;
// };

export interface ActionItem {
  action: ActionOnClickActionsType;
  icon: IconButtonProps['icon'];
  color: IconButtonProps['color'];
  size: IconButtonProps['size'];
  tooltip: string;
  permission?: PermissionsCodeName;
}
export type ActionCellFunction = { action: ActionItem };

export type MenuCellFunction = { menu: MenuType };

export type TableType =
  | 'action'
  | 'none'
  | 'component'
  | 'date'
  | 'avatar'
  | 'menu';

export type ActionOnClickActionsType =
  | 'delete'
  | 'edit'
  | 'details'
  | 'mutate'
  | 'download'
  | 'more'
  | 'button'
  | 'editLock';

export type OnClickActionsType<DataType> = (
  action: ActionOnClickActionsType,
  typeFile?: StringifyProperties<DataType> | DataType,
  id?: HeaderTable['id']
) => void;
