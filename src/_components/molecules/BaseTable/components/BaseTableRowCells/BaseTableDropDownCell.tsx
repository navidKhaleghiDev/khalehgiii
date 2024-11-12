import { useTranslation } from 'react-i18next';
import { BaseTableMenuCellProps, IdItem } from '../../types';
import DropDownHelperCell from '../HelperCell/DropDownHellperCell';

export function BaseTableDropDownCell<T extends IdItem>(
  props: BaseTableMenuCellProps<T>
) {
  const { t } = useTranslation();
  const { row, header, onClick } = props;

  if (header?.type === 'drop') {
    const { options, defaultValueLabelKey, translateKey, defaultValueKey } =
      header.drop;

    return (
      <div className="flex">
        <DropDownHelperCell
          onClick={(e: any) =>
            onClick
              ? onClick(e.value, {
                  ...row,
                  value: e.value,
                })
              : undefined
          }
          options={options}
          defaultValue={{
            id: row[defaultValueKey],
            label: t(`${translateKey}.${row[defaultValueLabelKey]}`),
            value: row[defaultValueLabelKey],
          }}
        />
      </div>
    );
  }

  return null;
}
