import { BaseButton, Card, Typography } from '@redesignUi/atoms';
import { ToggleButton } from '@redesignUi/atoms/ToggleButton/ToggleButton';
import CaretLeft from '@iconify-icons/ph/caret-left';

import { useTranslation } from 'react-i18next';

import { TimeScaleChart } from './TimeScaleChart';
import DashboardActiveLicense from '../DashboardActiveLicense';

export default function DashboardProgressBar() {
  const { t } = useTranslation();

  const datasets = [
    {
      label: 'فایل های اسکن شده', // نام مجموعه داده
      data: [
        { x: '2024-01-01', y: 65 }, // داده‌ها به شکل { x: 'تاریخ', y: مقدار }
        { x: '2024-02-01', y: 59 },
        { x: '2024-03-01', y: 80 },
        { x: '2024-04-01', y: 81 },
        { x: '2024-05-01', y: 56 },
        { x: '2024-06-01', y: 55 },
      ],
      borderColor: 'rgb(59, 130, 246)', // رنگ خط
      backgroundColor: 'rgba(59, 130, 246, 0.2)', // رنگ پس‌زمینه
    },
    {
      label: 'فایل‌های آلوده', // نام مجموعه داده
      data: [
        { x: '2024-03-01', y: 28 },
        { x: '2024-04-01', y: 48 },
        { x: '2024-05-01', y: 40 },
      ],
      borderColor: 'rgb(168, 85, 247)',
      backgroundColor: 'rgba(168, 85, 247, 0.2)',
    },
    {
      label: 'رفتارشناسی کاربر', // نام مجموعه داده
      data: [
        { x: '2024-01-01', y: 38 },
        { x: '2024-02-01', y: 58 },
        { x: '2024-03-01', y: 50 },
        { x: '2024-04-01', y: 29 },
        { x: '2024-05-01', y: 96 },
        { x: '2024-06-01', y: 37 },
      ],
      borderColor: 'rgb(20, 184, 166)',
      backgroundColor: 'rgba(20, 184, 166, 0.2)',
    },
  ];

  return (
    <Card rounded="xxl" shadow="base" className="p-5">
      <div className="w-full flex flex-col sm:flex-row">
        <div className="w-1/2">
          <Typography color="black" variant="body4B">
            {t('dashboard.progressChart')}
          </Typography>
          <Typography color="neutral" variant="body5">
            sep.npd-co.com
          </Typography>
        </div>
        <div className="w-1/2 flex sm:justify-end gap-2.5">
          <div className="col-span-6 justify-self-end sm:block hidden">
            <BaseButton
              label={t('global.domain')}
              endIcon={CaretLeft}
              size="sm"
              type="neutral"
            />
          </div>
          <div className="max-w-max">
            <ToggleButton
              buttonOptions={[
                { id: 1, label: t('table.monthly') },
                { id: 2, label: t('table.weekly') },
                { id: 3, label: t('table.daily'), active: true },
              ]}
              onChange={() => console.log('first')}
              size="responsive"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <TimeScaleChart datasets={datasets} />
      </div>
      <div>
        <DashboardActiveLicense />
      </div>
    </Card>
  );
}
