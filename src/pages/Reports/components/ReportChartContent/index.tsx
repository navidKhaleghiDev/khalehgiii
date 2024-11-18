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
  return recordsData && !error ? (
    <Card
      shadow="xl"
      color="white"
      rounded="xl"
      className="w-full flex justify-center items-center py-10 relative sm:h-[35rem] min-h-auto sm:max-h-[65vh] h-auto"
    >
      <LoadingWrapper isLoading={isLoading}>
        <div className="w-full flex justify-center sm:items-center items-start m-auto xl:h-[450px] h-auto min-h-auto max-h-[65vh]">
          <ReportsChart props={chartData} />
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
