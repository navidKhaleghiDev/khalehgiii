import { useTranslation } from 'react-i18next';
import {
  ActionOnClickActionsType,
  BaseTableMenuCellProps,
  IdItem,
} from '../../types';
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
          onClick={(e: React.ChangeEvent<HTMLInputElement>) =>
            onClick
              ? onClick(e.target.value as ActionOnClickActionsType, {
                  ...row,
                  value: e.target.value,
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
