import { Bar } from 'react-chartjs-2';
import moment from 'moment-jalaali';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@context/settings/themeContext';

import {
  ReportChartType,
  Data,
  DataGeneratorReturn,
  DataType,
  FormatData,
} from '../types';

export function ReportsChart({ props }: ReportChartType) {
  const { t } = useTranslation();
  const {
    HOURLY_FORMAT,
    MONTHLY_FORMAT,
    DAILY_FORMAT,
    NORMAL_FORMAT,
    flag,
    recordsData,
    isFarsi,
  } = props;
  const formatData: FormatData = {
    hourly: HOURLY_FORMAT,
    monthly: MONTHLY_FORMAT,
    daily: DAILY_FORMAT,
    weekly: NORMAL_FORMAT,
  };

  const { isDark } = useTheme();

  if (isFarsi) {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }

  function dataGeneratorTest(type: DataType, data: Data): DataGeneratorReturn {
    const dataListDownload: number[] = [];
    const dataListUpload: number[] = [];
    const labelsSet = new Set<string>();
    const labels: string[] = [];
    const downloadAggregated: { [key: string]: number } = {};
    const uploadAggregated: { [key: string]: number } = {};

    if (data && Object.keys(data).length > 0) {
      Object.entries(data).forEach(([date, values]) => {
        const formattedDate = moment(date).format(formatData[type]);

        if (type === 'monthly' || type === 'weekly') {
          if (!downloadAggregated[formattedDate]) {
            downloadAggregated[formattedDate] = 0;
            uploadAggregated[formattedDate] = 0;
          }
          downloadAggregated[formattedDate] += values.download;
          uploadAggregated[formattedDate] += values.upload;

          if (!labelsSet.has(formattedDate)) {
            labelsSet.add(formattedDate);
            labels.push(formattedDate);
          }
        } else {
          labels.push(formattedDate);
          dataListDownload.push(values.download);
          dataListUpload.push(values.upload);
        }
      });

      if (type === 'monthly' || type === 'weekly') {
        labels.forEach((label) => {
          dataListDownload.push(downloadAggregated[label]);
          dataListUpload.push(uploadAggregated[label]);
        });
      }
    }

    return {
      labels,
      datasets: [
        {
          label: t('global.download'),
          data: dataListDownload,
          fill: true,
          borderColor: 'rgb(96, 165, 250)',
          backgroundColor: 'rgba(96, 165, 250)',
        },
        {
          label: t('global.upload'),
          data: dataListUpload,
          fill: true,
          borderColor: 'rgb(192, 132, 252)',
          backgroundColor: 'rgba(192, 132, 252)',
        },
      ],
    };
  }

  const dataList = {
    labels: dataGeneratorTest(flag, recordsData).labels,
    datasets: dataGeneratorTest(flag, recordsData).datasets,
  };

  const options = {
    responsive: true,
    tooltip: {
      enabled: false,
      position: 'nearest',
      titleColor: 'rgba(0, 0, 0, 0.8)',
    },
    plugins: {
      tooltip: {
        callbacks: {
          label(res: any) {
            return res.raw.s;
          },
        },
      },
      legend: {
        position: 'top' as const,
      },
      title: {
        display: false,
        text: 'Chart.js Bar Chart',
      },
    },
    scales: {
      x: {
        ticks: {
          color: isDark ? 'rgb(156, 163, 175)' : 'rgb(104, 104, 104)',
        },
        grid: {
          color: isDark
            ? 'rgba(156, 163, 175, 0.5)'
            : 'rgba(104, 104, 104, 0.5)',
          lineWidth: 1,
        },
      },
      y: {
        ticks: {
          color: isDark ? 'rgb(156, 163, 175)' : 'rgb(104, 104, 104)',
        },
        grid: {
          color: isDark
            ? 'rgba(156, 163, 175, 0.5)'
            : 'rgba(104, 104, 104, 0.5)',
          lineWidth: 1,
        },
      },
    },
  };

  return <Bar data={dataList} options={options} />;
}
