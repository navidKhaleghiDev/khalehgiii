import { Bar } from 'react-chartjs-2';
import moment from 'moment-jalaali';
import {
  IReportChartType,
  TData,
  TDataGeneratorReturn,
  TDataType,
} from '../types';

export function ReportsChart({ props }: IReportChartType) {
  const {
    HOURLY_FORMAT,
    MONTLY_FORMAT,
    DAILY_FORMAT,
    NORMAL_FORMAT,
    flag,
    recordsData,
    isFarsi,
  } = props;
  const formatData = {
    hourly: HOURLY_FORMAT,
    monthly: MONTLY_FORMAT,
    daily: DAILY_FORMAT,
  };

  if (isFarsi) {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }

  function dataGenerator(type: TDataType, data: TData): TDataGeneratorReturn {
    const isDaily = formatData[type] === DAILY_FORMAT;
    const dataList: number[] | any = [];
    const labelList: string[] = [];
    const weeksKey: string[] = [];

    if (data && Object.keys(data).length > 0) {
      Object.entries(data).forEach(([key, value]) => {
        if (isDaily) {
          const weekStart = moment(key, 'YYYY-MM-DD').startOf('week');
          while (weekStart.isoWeekday() !== 6) {
            weekStart.subtract(1, 'day');
          }
          const weekKey = weekStart.format(NORMAL_FORMAT);
          if (!dataList[weekKey]) {
            dataList[weekKey] = [];
            weeksKey.push(weekKey);
          }
          dataList[weekKey].push({
            s: moment(key).format(NORMAL_FORMAT),
            y: value,
            x: moment(key).format(formatData[type]),
          });
        } else {
          dataList.push(value);
          labelList.push(moment(key).format(formatData[type]));
        }
      });
    }

    const dailyDataset = () =>
      Object.values(dataList).map((listData, i) => {
        return {
          label: `Week ${i + 1}`,
          data: listData,
          fill: false,
        };
      });

    const result = dailyDataset();

    return {
      datasets: isDaily
        ? result
        : [
            {
              label: '',
              data: dataList,
              fill: true,
            },
          ],
      labels: labelList,
    };
  }
  const dataList = {
    labels: dataGenerator(flag as any, recordsData).labels,
    datasets: dataGenerator(flag as any, recordsData).datasets,
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
  };

  return <Bar data={dataList} options={options} />;
}
