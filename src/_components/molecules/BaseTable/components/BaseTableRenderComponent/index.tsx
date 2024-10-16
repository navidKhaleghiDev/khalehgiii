import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { BaseTableActionCell } from '../BaseTableRowCells/BaseTableActionCell';
import { BaseTableComponentCell } from '../BaseTableRowCells/BaseTableComponentCell';
import { BaseTableNoneCell } from '../BaseTableRowCells/BaseTableNoneCell';

export const BaseTableRenderComponent = (props) => {
  const { header, row, onClick, collapse } = props;

  const { t } = useTranslation();

  const id = header?.id;

  const Components = {
    none: <BaseTableNoneCell row={row} id={id} header={header} />,
    component: (
      <BaseTableComponentCell
        type="component"
        row={row}
        header={header}
        id={id}
        onClick={onClick}
      />
    ),
    ...(collapse && {
      collapse: (
        <div className="bg-red-300 w-full h-14 flex-col justify-center items-center ">
          <Typography className="text-center">{t(header.label)}</Typography>
          <BaseTableComponentCell
            type="collapse"
            row={row}
            header={header}
            id={id}
            onClick={onClick}
          />
        </div>
      ),
    }),
    action: (
      <BaseTableActionCell
        row={row}
        header={header}
        id={id}
        onClick={onClick}
      />
    ),
  };

  return Components[header.type ?? 'none'];
};
