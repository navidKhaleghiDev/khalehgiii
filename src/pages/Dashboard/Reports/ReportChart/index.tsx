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

// filter data for montly format
const filterByIndex = (data, index) => data.filter((l, i) => i !== index);
const filterChartData = (label, data) => {
  const index = label.findIndex((e) => e === e);
  const removeList = filterByIndex(label, index);
  const removeDataList = filterByIndex(data, index);
  return { labelList: removeList, dataList: removeDataList };
};

export function ReportsChart({ props }: IReportChartType) {
  const { t } = useTranslation();
  const {
    HOURLY_FORMAT,
    MONTLY_FORMAT,
    DAILY_FORMAT,
    NORMAL_FORMAT,
    flag,
    recordsData,
    isFarsi,
  } = props;
  const formatData: TFormatData = {
    hourly: HOURLY_FORMAT,
    monthly: MONTLY_FORMAT,
    daily: DAILY_FORMAT,
  };

  if (isFarsi) {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true });
  }

  function dataGenerator(type: TDataType, data: TData): TDataGeneratorReturn {
    const isDaily = formatData[type] === DAILY_FORMAT;
    const isMonthly = formatData[type] === MONTLY_FORMAT;
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

    return {
      datasets: isDaily
        ? result
        : [
            {
              label: '',
              data: isMonthly ? res.dataList : dataList,
              fill: true,
            },
          ],
      labels: isMonthly ? res.labelList : labelList,
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
