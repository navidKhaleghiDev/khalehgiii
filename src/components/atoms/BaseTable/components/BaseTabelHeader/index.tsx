/* eslint-disable react/no-array-index-key */
import { Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';
import { IHeaderTable } from '../../types';
import { baseTableHeader } from '../../styles';

interface PropsType {
  header: IHeaderTable[];
}

export function BaseTabelHeader({ header }: PropsType) {
  const { t } = useTranslation();

  return (
    <thead className="flex items-center px-2 bg-teal-500 dark:bg-gray-600  rounded-md text-white h-10 w-full mb-1">
      {header.map((head: IHeaderTable, index: number) => (
        <tr
          key={index}
          className={baseTableHeader({
            fixed: head.fixed,
            className: `${head.style} ${head.fixed && 'fixed'}`,
          })}
          dir={!head.dir ? 'ltr' : head.dir}
        >
          <td className="">
            <Typography
              variant="body4"
              type="div"
              className="uppercase ellipsis font-bold"
            >
              {t(head.label)}
            </Typography>
          </td>
        </tr>
      ))}
    </thead>
  );
}
