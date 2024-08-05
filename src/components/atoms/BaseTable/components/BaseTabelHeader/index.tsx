/* eslint-disable react/no-array-index-key */
import { Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';
import { IHeaderTable } from '../../types';
import { baseTableHeader } from '../../styles';

interface PropsType {
  header: IHeaderTable[];
  hasVerticalScroll: boolean;
}

export function BaseTabelHeader({ header, hasVerticalScroll }: PropsType) {
  const { t } = useTranslation();

  return (
    <thead className="flex items-center px-2 bg-teal-500 dark:bg-gray-600  rounded-md text-white h-10 w-full mb-1">
      {header.map((head: IHeaderTable, index: number) => (
        <tr
          key={index}
          className={baseTableHeader({
            fixed: !hasVerticalScroll && head.fixed,
            className: `${head.class} ${
              head.fixed && !hasVerticalScroll
                ? 'fixed  z-50  rounded-md -mx-2'
                : ''
            }`,
          })}
          dir={!head.dir ? 'ltr' : head.dir}
        >
          <td className="">
            <Typography
              variant="body4"
              type="div"
              className="uppercase ellipsis font-bold"
            >
              {t(head.label as string)}
            </Typography>
          </td>
        </tr>
      ))}
    </thead>
  );
}
