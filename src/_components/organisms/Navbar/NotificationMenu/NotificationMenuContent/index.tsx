import { Typography } from '@redesignUi/atoms';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { t } from 'i18next';

import { items, ItemsProps } from './items';

export function NotificationMenuContent() {
  return (
    <div className="flex flex-col w-[21.87rem] max-h-[21.43rem] rounded-2xl shadow-md bg-gray-100 dark:bg-gray-500">
      <div className="w-[21.87rem] h-10 px-5 py-2">
        <Typography variant="body3B" color="neutral">
          {t('table.today')}
        </Typography>
      </div>
      <div className="box-border w-[21.87rem] bg-white dark:bg-gray-600 flex flex-col items-center gap-4 py-4">
        {items.map((item: ItemsProps) => {
          return (
            <div
              key={item.id}
              className="flex justify-start items-center border-b border-gray-300 dark:border-gray-400 w-[19.37rem] h-12 gap-2 pb-4"
            >
              <IconButton icon={item.icon} size="md" className={item.color} />

              <Typography color="neutral" variant="body5" className="leading-5">
                {item.label}
              </Typography>
            </div>
          );
        })}
      </div>
      <div className="w-[21.87rem] h-10 px-5 py-2">
        <Typography variant="body3B" color="neutral">
          {t('table.yesterday')}
        </Typography>
      </div>
    </div>
  );
}
