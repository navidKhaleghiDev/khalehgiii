/* eslint-disable react/no-array-index-key */
import { Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';
import { IHeaderTable } from '../../types';

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
          className={` flex justify-center items-center font-normal ${
            head.style
          } ${
            head.style && head.style.includes('fixed')
              ? 'px-2 bg-teal-500 dark:bg-gray-600  h-10'
              : ''
          } `}
          dir={!head.dir ? 'ltr' : head.dir}
        >
          <td className="">
            <Typography
              size="body4"
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
