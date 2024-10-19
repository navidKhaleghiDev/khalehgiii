import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';
import {
  BaseTableCollapseMobileProps,
  IdItem,
} from '@redesignUi/molecules/BaseTable/types';
import { BaseTableRenderComponent } from '../../BaseTableRenderComponent';

export function BaseTableCollapseMobile<T extends IdItem>(
  props: BaseTableCollapseMobileProps<T>
) {
  const { t } = useTranslation();
  const { header, row, onClick } = props;

  return (
    <tr className="bg-gray-100 last:border-b-0 first:border-t-0 border-x-0">
      {header.map((headerList) => (
        <th
          key={headerList.label}
          className="w-full flex justify-between border border-gray-300 h-10 px-5"
        >
          <Typography color="neutral" variant="body6">
            {t(headerList.label as string)}
          </Typography>
          <div>
            <BaseTableRenderComponent
              row={row}
              header={headerList}
              onClick={onClick}
            />
          </div>
        </th>
      ))}
    </tr>
  );
}
