import { Bar } from 'react-chartjs-2';
import moment from 'moment-jalaali';
import { useTranslation } from 'react-i18next';
import {
  IReportChartType,
  TData,
  TDataGeneratorReturn,
  TDataType,
  TFormatData,
} from '../types';

let duplicates: number;
// filter data for monthly format
const filterByIndex = (data: string[] | number[], index: number) =>
  data.filter((_, i) => i !== index);
const filterChartData = (label: string[], data: number[]) => {
  const map = new Map();
  label.forEach((element, index) => {
    if (map.has(element)) {
      duplicates = map.get(element);
    } else {
      map.set(element, index);
    }
  });
  const removeList = filterByIndex(label, duplicates);
  const removeDataList = filterByIndex(data, duplicates);
  return { dataList: removeDataList, labelList: removeList };
};

export function ReportsChart({ props }: IReportChartType) {
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
  const formatData: TFormatData = {
    hourly: HOURLY_FORMAT,
    monthly: MONTHLY_FORMAT,
    daily: DAILY_FORMAT,
  };

  if (isFarsi) {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }

  function dataGenerator(type: TDataType, data: TData): TDataGeneratorReturn {
    const isDaily = formatData[type] === DAILY_FORMAT;
    const isMonthly = formatData[type] === MONTHLY_FORMAT;
    const dataList: number[] | any = [];
    const labelList: string[] = [];
    const weeksKey: string[] = [];

    if (data && Object.keys(data).length > 0) {
      Object.entries(data).forEach(([key, value]) => {
        if (isDaily) {
          // convert data base on daily mode
          // check and update base on local language
          // seprate date by week and put any date in seprate object
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

    const res = filterChartData(labelList, dataList);

    const dailyDataset = () =>
      Object.values(dataList).map((listData, i) => {
        return {
          label: ` ${t('global.week')} ${i + 1}`,
          data: listData,
          fill: false,
        };
      });

    const result = dailyDataset();

    const labels = isMonthly ? res.labelList : labelList;
    const chartData = isMonthly ? res.dataList : dataList;
    return {
      datasets: isDaily
        ? result
        : [
            {
              label: '',
              data: chartData,
              fill: true,
            },
          ],
      labels: labels as string[],
    };
  }

  const dataList = {
    labels: dataGenerator(flag, recordsData).labels,
    datasets: dataGenerator(flag, recordsData).datasets,
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
