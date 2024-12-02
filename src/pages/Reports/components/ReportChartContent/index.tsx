import { useTranslation } from 'react-i18next';

import { LoadingWrapper } from '@redesignUi/molecules/Loading/LoadingWrapper';
import { Card, Typography } from '@redesignUi/atoms';
import { NoReportChart } from '@redesignUi/atoms/Svgs';

import { ReportsChart } from '../ReportChart';

type ReportChartContentProps = {
  recordsData: any;
  chartData: any;
  isLoading: boolean;
  error: boolean;
  message: string;
};

export function ReportChartContent({
  recordsData,
  chartData,
  isLoading,
  error,
  message,
}: ReportChartContentProps) {
  const { t } = useTranslation();

  return recordsData && !error ? (
    <Card
      shadow="xl"
      color="white"
      rounded="xl"
      className="w-full flex justify-center items-center py-10 relative sm:h-[35rem] min-h-auto sm:max-h-[65vh] h-auto"
    >
      <LoadingWrapper isLoading={isLoading}>
        <div className="w-full flex md:flex-row flex-col md:py-5 md:px-10 p-5 gap-5">
          <div className="flex md:flex-col flex-row md:justify-start justify-center items-start gap-3">
            <Typography
              className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-blue-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
              variant="body5"
              color="neutral"
            >
              {t('global.download')}
            </Typography>
            <Typography
              className="flex items-baseline group before:content-[''] before:w-2 before:h-2 before:block before:bg-purple-400 before:rounded-full gap-1 sm:gap-5 flex-row-reverse sm:flex-row whitespace-nowrap"
              variant="body5"
              color="neutral"
            >
              {t('global.upload')}
            </Typography>
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
            <NoReportChart className="sm:w-auto w-[350px] sm:h-auto h-[200px]" />
          </div>
        </Typography>
      ) : (
        <Typography
          className="text-center flex flex-col justify-center items-center gap-3 sm:text-2xl text-lg bg-transparent"
          type="div"
          color="neutral"
        >
          <div className="self-center">
            <NoReportChart className="sm:w-auto w-[350px] sm:h-auto h-[200px]" />
          </div>
          {message}
        </Typography>
      )}
    </Card>
  );
}
