import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';
import {
  BaseTableCollapseDesktopProps,
  IdItem,
} from '@redesignUi/molecules/BaseTable/types';
import { BaseTableRenderComponent } from '../../BaseTableRenderComponent';

export function BaseTableCollapseDesktop<T extends IdItem>(
  props: BaseTableCollapseDesktopProps<T>
) {
  const { t } = useTranslation();
  const { header, row, onClick } = props;

  return (
    <tr className="flex justify-between h-16 bg-gray-100 border border-gray-400 border-t-0 transition duration-150 ease-in-out">
      {header.map((headerList) => (
        <td
          key={headerList.label}
          className="h-14 flex-col px-3 flex gap-2 justify-start"
        >
          <Typography color="neutral" variant="body6">
            {t(headerList.label as string)}
          </Typography>
          <BaseTableRenderComponent
            row={row}
            header={headerList}
            onClick={onClick}
          />
        </td>
      ))}
    </tr>
  );
}
