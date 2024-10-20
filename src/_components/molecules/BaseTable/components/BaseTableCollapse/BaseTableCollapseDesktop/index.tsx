import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';
import {
  BaseTableCollapseDesktopProps,
  IdItem,
} from '@redesignUi/molecules/BaseTable/types';
import { baseTableCollapseDesktop } from '@redesignUi/molecules/BaseTable/styles';
import { BaseTableRenderComponent } from '../../BaseTableRenderComponent';

export function BaseTableCollapseDesktop<T extends IdItem>(
  props: BaseTableCollapseDesktopProps<T>
) {
  const { t } = useTranslation();
  const { header, row, onClick } = props;

  return (
    <tr className={baseTableCollapseDesktop()}>
      {header.map((headerList) => (
        <td
          key={headerList.label}
          className="h-12 flex-col px-3 gap-2  flex justify-start"
        >
          <Typography
            className="text-gray-500 dark:text-gray-400"
            variant="body6"
          >
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
