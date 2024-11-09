import DropDownHelperCell from '../HelperCell/DropDownHellperCell';
import { useTranslation } from 'react-i18next';

export function BaseTableDropDownCell<T extends IdItem>(
  props: BaseTableMenuCellProps<T>
) {
  const { t } = useTranslation();

  const { row, header, onClick } = props;

  const { options, defaultValueLabelKey, translateKey, defaultValueKey } =
    header.drop;

  return (
    header?.type === 'drop' && (
      <div className="flex">
        <DropDownHelperCell
          onClick={(e) =>
            onClick ? onClick(e.value, { ...row, value: e.value }) : undefined
          }
          options={options}
          defaultValue={{
            id: row[defaultValueKey],
            label: t(`${[translateKey]}.${row[defaultValueLabelKey]}`),
            value: row[defaultValueLabelKey],
          }}
        />
      </div>
    )
  );
}
