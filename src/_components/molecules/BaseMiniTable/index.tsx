import { Card } from '@redesignUi/atoms';

import { BaseMiniTableSkeleton } from './loading';
import { BaseMiniTableNoResult } from './components/BaseMiniTableNoResult';
import { BaseMiniTableProps, IdItem } from './types';

export function BaseMiniTable<T extends IdItem>(props: BaseMiniTableProps<T>) {
  const { header, body, loading } = props;

  return (
    <Card
      className="w-[445px] h-52 overflow-hidden "
      color="white"
      shadow="base"
      rounded="xl"
    >
      <div className="w-full p-6">
        <div className="w-full text-xs text-gray-500 ">
          <div className="flex">
            {Object.keys(header).map((key) => (
              <div key={key} className="flex-1 px-4 py-2 ">
                {header[key]}
              </div>
            ))}
          </div>
        </div>

        {loading ? (
          <BaseMiniTableSkeleton />
        ) : (
          <div className="w-full ">
            {body.length >= 1 ? (
              body.map((item) => (
                <div
                  key={item.id}
                  className=" max-h-7 mt-1 bg-white rounded-lg border border-gray-100 overflow-hidden"
                >
                  <div className="flex">
                    {Object.keys(header).map((key) => (
                      <div
                        key={key}
                        className="flex-1 px-4 py-2 text-gray-900 text-xs"
                      >
                        {item[key]}
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
