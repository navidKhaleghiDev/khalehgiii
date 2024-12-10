import { useTranslation } from 'react-i18next';

import { LoadingWrapper } from '@redesignUi/molecules/Loading/LoadingWrapper';
import { Card, Typography } from '@redesignUi/atoms';
import { NoReportChart } from '@redesignUi/atoms/Svgs';
import { LegendChart } from '@redesignUi/molecules/Charts/LegendChart';

import { ReportsChart } from '../ReportChart';
import { PropsChartType } from '../../types';

type ReportChartContentProps = {
  chartData: PropsChartType;
  isLoading: boolean;
  error: boolean;
  message: string;
};

export function ReportChartContent({
  chartData,
  isLoading,
  error,
  message,
}: ReportChartContentProps) {
  const { t } = useTranslation();

  return chartData.recordsData && !error ? (
    <Card
      shadow="xl"
      color="white"
      rounded="xl"
      className="w-full flex justify-center items-center py-10 h-auto"
    >
      <LoadingWrapper isLoading={isLoading}>
        <div className="w-full flex md:flex-row flex-col md:py-5 md:px-10 p-5 gap-5">
          <div className="flex md:flex-col flex-row md:justify-start justify-center items-start gap-3">
            <LegendChart description={t('global.download')} color="blue" />
            <LegendChart description={t('global.upload')} color="purple" />
          </div>
          <div className="w-full flex justify-center sm:items-center items-start m-auto xl:h-[450px] h-auto min-h-auto max-h-[65vh]">
            <ReportsChart props={chartData} />
          </div>
        </div>
      </LoadingWrapper>
    </Card>
  ) : (
    <Card className="w-full flex items-center justify-center !bg-transparent dark:bg-gray-700">
      {error ? (
        <Typography
          className="text-right flex flex-col justify-start items-start gap-3 w-full lg:text-xl sm:text-lg text-sm"
          type="div"
          color="red"
        >
          {message}
          <div className="self-center">
            <NoReportChart className="sm:w-auto w-[21.875rem] sm:h-auto h-[12.5rem]" />
          </div>
        </Typography>
      ) : (
        <Typography
          className="text-center flex flex-col justify-center items-center gap-3 sm:text-2xl text-lg bg-transparent"
          type="div"
          color="neutral"
        >
          <div className="self-center">
            <NoReportChart className="sm:w-auto w-[21.875rem] sm:h-auto h-[12.5rem]" />
          </div>
          {message}
        </Typography>
      )}
    </Card>
  );
}
