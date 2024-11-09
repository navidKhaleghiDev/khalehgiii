import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { BaseButton, Typography } from '@redesignUi/atoms';
import { ToggleButton } from '@redesignUi/atoms/ToggleButton/ToggleButton';
import CaretLeft from '@iconify-icons/ph/caret-left';
import CaretRight from '@iconify-icons/ph/caret-right';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import ChartBar from '@iconify-icons/ph/chart-bar-duotone';
import ChartLine from '@iconify-icons/ph/chart-line';
import GlobeSimple from '@iconify-icons/ph/globe-simple';
import { TimeScaleChart } from '@redesignUi/molecules/Charts/TimeScaleChart';
import { VerticalBarChart } from '@redesignUi/molecules/Charts/VerticalBarChart';
import { useLanguage } from '@context/settings/languageContext';

export function DashboardProgressChart() {
  const [chartType, setChartType] = useState('line');
  const [timeFrame, setTimeFrame] = useState('daily');
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const farsi = lang === 'fa';
  const caretLeft = farsi ? CaretLeft : CaretRight;

  // mock
  const datasets = [
    {
      label: 'فایل های اسکن شده',
      data: [
        { x: '2024-01-01', y: 65 },
        { x: '2024-02-01', y: 59 },
        { x: '2024-03-01', y: 80 },
        { x: '2024-04-01', y: 81 },
        { x: '2024-05-01', y: 56 },
        { x: '2024-06-01', y: 55 },
      ],
      borderColor: 'rgb(96, 165, 250)',
      backgroundColor: 'rgba(96, 165, 250)',
    },
    {
      label: 'فایل‌های آلوده',
      data: [
        { x: '2024-03-01', y: 28 },
        { x: '2024-04-01', y: 48 },
        { x: '2024-05-01', y: 40 },
      ],
      borderColor: 'rgb(192, 132, 252)',
      backgroundColor: 'rgba(192, 132, 252)',
    },
    {
      label: 'رفتارشناسی کاربر',
      data: [
        { x: '2024-01-01', y: 38 },
        { x: '2024-02-01', y: 58 },
        { x: '2024-03-01', y: 50 },
        { x: '2024-04-01', y: 29 },
        { x: '2024-05-01', y: 96 },
        { x: '2024-06-01', y: 37 },
      ],
      borderColor: 'rgb(45, 212, 191)',
      backgroundColor: 'rgba(45, 212, 191)',
    },
  ];

  return (
    <>
      <div className="w-full flex flex-col sm:flex-row pb-2.5 sm:pb-[3.125rem]">
        <div className="w-1/2">
          <Typography color="black" variant="body4B">
            {t('dashboard.progressChart')}
          </Typography>
          <Typography color="neutral" variant="body5">
            sep.npd-co.com
          </Typography>
        </div>
        <div className="w-1/2 flex sm:justify-end gap-2.5">
          <div className="col-span-6 justify-self-end">
            <BaseButton
              label={t('global.domain')}
              endIcon={caretLeft}
              size="sm"
              type="neutral"
              className="sm:flex hidden"
              disabled // This button is disabled until the backend provides data for the domain
            />
            <IconButton
              icon={GlobeSimple}
              color="neutral"
              size="sm"
              className="sm:hidden flex"
            />
          </div>
          <div className="max-w-max">
            <ToggleButton
              buttonOptions={[
                {
                  id: 1,
                  label: t('table.monthly'),
                  value: 'monthly',
                  active: timeFrame === 'monthly',
                },
                {
                  id: 2,
                  label: t('table.weekly'),
                  value: 'weekly',
                  active: timeFrame === 'weekly',
                },
                {
                  id: 3,
                  label: t('table.daily'),
                  value: 'daily',
                  active: timeFrame === 'daily',
                },
              ]}
              onChange={(data) => setTimeFrame(data?.value)}
              size="responsive"
            />
          </div>
        </div>
      </div>
      <div className="flex w-full justify-center sm:justify-between flex-col sm:flex-row pb-5">
        <div className="flex sm:flex-col flex-row justify-between flex-wrap">
          <div className="flex flex-row sm:flex-col items-start justify-start gap-2.5 pt-5 shrink-0">
            <Typography
              className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-blue-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
              variant="body6"
              color="neutral"
            >
              {t('fileScan.scannedFiles')}
            </Typography>
            <Typography
              className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-purple-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
              variant="body6"
              color="neutral"
            >
              {t('dashboard.virusFiles')}
            </Typography>
            <Typography
              className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-teal-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
              variant="body6"
              color="neutral"
            >
              {t('dashboard.userBehavior')}
            </Typography>
          </div>
          <div className="flex gap-2.5 pb-5 items-end justify-self-end">
            <IconButton
              icon={ChartBar}
              color="neutral"
              type="button"
              onClick={() => setChartType('bar')}
              size="md"
            />
            <IconButton
              icon={ChartLine}
              color="neutral"
              type="button"
              onClick={() => setChartType('line')}
              size="md"
            />
          </div>
        </div>
        <div className="max-w-[31.25rem] w-full sm:h-[15.625rem] h-auto flex [&>*:first-child]:self-end [&>*:first-child]:justify-self-end justify-end">
          {chartType === 'line' ? (
            <TimeScaleChart datasets={datasets} />
          ) : (
            <VerticalBarChart datasets={datasets} />
          )}
        </div>
      </div>
    </>
  );
}
