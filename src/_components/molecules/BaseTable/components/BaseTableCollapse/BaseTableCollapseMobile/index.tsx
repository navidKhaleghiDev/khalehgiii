import { Typography } from '@redesignUi/atoms';
import { useTranslation } from 'react-i18next';
import {
  BaseTableCollapseMobileProps,
  IdItem,
} from '@redesignUi/molecules/BaseTable/types';
import { baseTableCollapseMobile } from '@redesignUi/molecules/BaseTable/styles';
import { BaseTableRenderComponent } from '../../BaseTableRenderComponent';

export function BaseTableCollapseMobile<T extends IdItem>(
  props: BaseTableCollapseMobileProps<T>
) {
  const { t } = useTranslation();
  const { header, row, onClick } = props;

  return (
    <tr className={baseTableCollapseMobile()}>
      {header.map((headerList) => (
        <th
          key={headerList.label}
          className="w-full flex justify-between items-center border border-gray-300 h-10 px-2"
        >
          <Typography className="font-normal" color="neutral" variant="body6">
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
