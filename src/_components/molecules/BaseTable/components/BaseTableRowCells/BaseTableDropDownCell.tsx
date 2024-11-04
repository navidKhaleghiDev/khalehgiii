import DropDownHelperCell from '../HelperCell/DropDownHellperCell';

export function BaseTableDropDownCell<T extends IdItem>(
  props: BaseTableMenuCellProps<T>
) {
  const { row, header, onClick } = props;

  const { options, label, defaultValueLabelKey, defaultValueKey } = header.drop;

  return (
    header?.type === 'drop' && (
      <div className="flex">
        <DropDownHelperCell
          onClick={(e) =>
            onClick ? onClick(e.label, { ...row, label: e.label }) : undefined
          }
          options={options}
          defaultValue={{
            id: row[defaultValueKey],
            label: row[defaultValueLabelKey],
          }}
        />
      </div>
    )
  );
}
