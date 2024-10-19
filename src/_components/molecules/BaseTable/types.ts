import { PermissionsCodeName } from '@src/types/permissions';
import { StringifyProperties } from '@src/types/global';
import { IconButtonProps } from '@redesignUi/atoms/BaseButton';

export type BaseTableProps<BodyType> = {
  header: IHeaderTable[];
  body: BodyType[];
  loading: boolean;
  isMobile?: boolean;
  onClick?: OnClickActionsType<BodyType>;
};

export interface IHeaderTable {
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

export type BaseTableHeaderProps = Pick<BaseTableProps<IdItem>, 'header'> & {
  collapse?: boolean;
};

export type BaseTableBodyProps = Pick<
  BaseTableProps<IdItem>,
  'header' | 'onClick' | 'body' | 'isMobile'
> & {
  collapseHeader: IHeaderTable[];
};

export type BaseTableRowProps<BodyType> = Pick<
  BaseTableProps<IdItem>,
  'header' | 'onClick' | 'body' | 'isMobile'
> & {
  collapseHeader: IHeaderTable[];
  row: BodyType;
  index: number;
};
export type BaseTableRenderComponentProps<BodyType> = Pick<
  BaseTableProps<IdItem>,
  'onClick'
> & {
  row: BodyType;
  header: IHeaderTable;
};

export type BaseTableCollapseDesktopProps<BodyType> = Omit<
  BaseTableRenderComponentProps<BodyType>,
  'header'
> & {
  header: IHeaderTable[];
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

export type BaseTableComponentCellProps<BodyType> = Pick<
  BaseTableRowProps<BodyType>,
  'row' | 'onClick'
> & {
  header: IHeaderTable;
  id: IHeaderTable['id'];
  row: BodyType;
};

export type BaseTableNoneCellProps<BodyType extends IdItem> = Pick<
  BaseTableRowProps<BodyType>,
  'row' | 'onClick'
> & {
  header: IHeaderTable;
  id: any;
  row: any;
};

export type CategorizedData = {
  mobile: IHeaderTable[];
  desktop: IHeaderTable[];
  nonCollapsedMobile: IHeaderTable[];
  nonCollapsedDesktop: IHeaderTable[];
};

type TableLabel = `table.${string}` | string;

export type IdItem = { id: string | number };

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

export type TableType = 'action' | 'none' | 'component' | 'button' | 'date';

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
  id?: IHeaderTable['id']
) => void;
