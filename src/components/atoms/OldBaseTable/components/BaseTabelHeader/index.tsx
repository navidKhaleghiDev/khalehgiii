/* eslint-disable react/no-array-index-key */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Typography } from '@ui/atoms';
import { HeaderTableProps } from '../../types';
import { baseTableHeader } from '../../styles';

interface PropsType {
  header: HeaderTableProps[];
}

export function BaseTabelHeader({ header }: PropsType) {
  const { t } = useTranslation();

  const [hasVerticalScroll, setHasVerticalScroll] = useState(false);

  const checkVerticalScroll = () => {
    setHasVerticalScroll(
      document.documentElement.scrollHeight > window.innerHeight
    );
  };

  useEffect(() => {
    checkVerticalScroll();
    window.addEventListener('resize', checkVerticalScroll);
    return () => {
      window.removeEventListener('resize', checkVerticalScroll);
    };
  }, []);

  return (
    <thead className="flex items-center px-2 bg-teal-500 dark:bg-gray-600  rounded-md text-white h-10 w-full mb-1">
      {header.map((head: HeaderTableProps, index: number) => {
        return (
          <tr
            key={index}
            className={baseTableHeader({
              fixed: !hasVerticalScroll ? head.fixed : false,
              className: `${head.class} ${
                head.fixed && !hasVerticalScroll
                  ? 'fixed z-50 rounded-md -mx-2 '
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
        );
      })}
    </thead>
  );
}
