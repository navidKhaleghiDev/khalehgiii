import { useLanguage } from '@context/settings/languageContext';
import { Card, Typography } from '@redesignUi/atoms';

import { BaseMiniTableNoResult } from './components/BaseMiniTableNoResult';
import { BaseMiniTableProps, IdItem } from './types';
import { Pagination } from '../Pagination';
import { BaseTableDateCell } from '../BaseTable/components/BaseTableRowCells/BaseTableDateCell';
import { LoadingSpinner } from '../Loading';

export function BaseMiniTable<T extends IdItem>(props: BaseMiniTableProps<T>) {
  const { header, body, loading, pagination, title, date, className } = props;
  const { currentPage, totalPages, onPageChange } = pagination;

  const { isFarsi } = useLanguage();
  const directionStyle = isFarsi
    ? 'group-hover:-translate-x-[50%]'
    : 'group-hover:translate-x-[50%]';

  const isDateKey = (key: string) => {
    return Array.isArray(date) ? date.includes(key) : key === date;
  };

  return (
    <Card
      className={`w-[445px] h-[280px] flex-col justify-center items-center p-5 ${className}`}
      color="white"
      shadow="base"
      rounded="xl"
    >
      <div className="flex justify-between mb-2.5">
        <Typography variant="body4B" color="black">
          {title}
        </Typography>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          headerPagination
        />
      </div>

      <div className="w-full">
        <div className="w-full text-xs bg-white dark:bg-gray-500 text-gray-500 rounded-lg dark:text-gray-200">
          <div className="flex">
            {Object.keys(header).map((key) => (
              <div key={key} className="flex-1 px-4 py-1">
                {header[key]}
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : (
          <div className="w-full">
            {body.length >= 1 ? (
              body.map((item) => (
                <div
                  key={item.id}
                  className="max-h-7 mt-1 bg-white dark:bg-gray-600 rounded-lg border border-gray-100"
                >
                  <div className="flex">
                    {Object.keys(header).map((key) => (
                      <div
                        key={key}
                        className="group flex-1 px-4 py-2 text-gray-900 dark:text-gray-300 text-xs overflow-hidden"
                      >
                        <Typography
                          type="div"
                          className={`!text-ellipsis whitespace-nowrap group-hover:whitespace-nowrap group-hover:overflow-visible transition-transform duration-1000 ease-linear ${directionStyle} group-hover:duration-[1000ms]`}
                        >
                          {isDateKey(key) ? (
                            <BaseTableDateCell id={key} row={item} />
                          ) : (
                            item[key]
                          )}
                        </Typography>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <BaseMiniTableNoResult />
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
