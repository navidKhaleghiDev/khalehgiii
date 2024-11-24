import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import moment from 'moment-jalaali';

import { useLanguage } from '@context/settings/languageContext';
import { API_GET_REPORTS } from '@src/services/config';
import { HeaderProgressChartSection } from './HeaderProgressChartSection';
import { Legend } from './Legend';
import { ChartToggleButtons } from './ChartToggleButton';
import { ChartContent } from './ChartContent';

type DateTimeFormat = {
  start_date: string;
  end_date: string;
};

type RecordItem = {
  download_clean: number;
  download_malware: number;
  upload_clean: number;
  upload_malware: number;
};

type Records = {
  [date: string]: RecordItem;
};

export function DashboardProgressChart() {
  const [chartType, setChartType] = useState('line');
  const [timeFrame, setTimeFrame] = useState('daily');
  const [recordsData, setRecordsData] = useState<Records | null>(null);
  const [fileScanData, setFileScanData] = useState<{ x: string; y: number }[]>(
    []
  );
  const [malwareFileData, setMalwareFileData] = useState<
    { x: string; y: number }[]
  >([]);
  const { t } = useTranslation();
  const { lang } = useLanguage();

  const farsi = lang === 'fa';

  if (farsi) {
    moment.loadPersian({ dialect: 'persian-modern', usePersianDigits: false });
  }

  const formatData: { [key: string]: string } = useMemo(
    () => ({
      daily: 'HH:mm',
      weekly: 'dddd',
      monthly: farsi ? 'jMMMM' : 'MMMM',
    }),
    [farsi]
  );

  const getScanFilesResponse = async (updatedData: DateTimeFormat) => {
    try {
      const res = await API_GET_REPORTS(updatedData);
      const result = res.data;
      if (result.records && Object.keys(result.records).length > 0) {
        setRecordsData(result.records);
      } else {
        setRecordsData(null);
        console.warn('No data available for the selected date range.');
      }
    } catch (err) {
      if (err instanceof Error) {
        console.error('Error message:', err.message);
      } else {
        console.error('Unexpected error:', err);
      }
      setRecordsData(null);
    }
  };

  useEffect(() => {
    const updatedDate = {
      start_date: moment().format('YYYY-MM-DD'),
      end_date: moment().format('YYYY-MM-DD'),
    };

    switch (timeFrame) {
      case 'daily':
        break;
      case 'weekly':
        updatedDate.start_date = moment()
          .subtract(6, 'days')
          .format('YYYY-MM-DD');
        break;
      case 'monthly':
        updatedDate.start_date = moment()
          .month(3)
          .startOf('month')
          .format('YYYY-MM-DD');
        break;
      default:
        break;
    }

    getScanFilesResponse(updatedDate);
  }, [timeFrame]);

  useEffect(() => {
    if (recordsData) {
      const scanData = Object.entries(recordsData).map(([date, values]) => {
        const formattedDate = moment(date).format(formatData[timeFrame]);
        if (
          typeof values === 'object' &&
          'download_clean' in values &&
          'upload_clean' in values &&
          'download_malware' in values &&
          'upload_malware' in values
        ) {
          const totalScans =
            values.download_clean +
            values.upload_clean +
            values.download_malware +
            values.upload_malware;
          const totalMalware = values.download_malware + values.upload_malware;

          return {
            scanData: { x: formattedDate, y: totalScans },
            malwareData: { x: formattedDate, y: totalMalware },
          };
        }
        return {
          scanData: { x: formattedDate, y: 0 },
          malwareData: { x: formattedDate, y: 0 },
        };
      });

      setFileScanData(scanData.map((item) => item.scanData));
      setMalwareFileData(scanData.map((item) => item.malwareData));
    } else {
      setFileScanData([]);
      setMalwareFileData([]);
    }
  }, [recordsData, timeFrame, formatData]);

  const datasets = [
    {
      label: t('fileScan.scannedFiles'),
      data: fileScanData,
      borderColor: 'rgb(96, 165, 250)',
      backgroundColor: 'rgba(96, 165, 250)',
    },
    {
      label: t('dashboard.virusFiles'),
      data: malwareFileData,
      borderColor: 'rgb(192, 132, 252)',
      backgroundColor: 'rgba(192, 132, 252)',
    },
  ];

  return (
    <>
      <HeaderProgressChartSection
        setTimeFrame={setTimeFrame}
        t={t}
        timeFrame={timeFrame}
      />
      <div className="flex w-full justify-center sm:justify-between flex-col sm:flex-row pb-5">
        <div className="flex sm:flex-col flex-row justify-between flex-wrap">
          <Legend t={t} />

          <ChartToggleButtons setChartType={setChartType} />
        </div>
        <div className="max-w-[31.25rem] w-full sm:h-[15.625rem] h-auto flex [&>*:first-child]:self-end [&>*:first-child]:justify-self-end justify-end">
          <ChartContent chartType={chartType} datasets={datasets} />
        </div>
      </div>
    </>
  );
}
