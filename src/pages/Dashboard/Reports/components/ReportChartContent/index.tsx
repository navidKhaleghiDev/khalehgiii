import { LoadingWrapper } from '@redesignUi/molecules/Loading/LoadingWrapper';
import { BaseIcon, Card, Typography } from '@redesignUi/atoms';
import calendarBlankDuotone from '@iconify-icons/ph/calendar-blank-duotone';
import calendarXDuotone from '@iconify-icons/ph/calendar-x-duotone';

import { ReportsChart } from '../../ReportChart';

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
  return (
    <Card
      shadow="xl"
      color="white"
      rounded="xl"
      className="w-full flex justify-center items-center py-10 relative sm:h-[35rem] min-h-auto sm:max-h-[65vh] h-auto"
    >
      <LoadingWrapper isLoading={isLoading}>
        {recordsData && !error ? (
          <div className="w-full flex justify-center sm:items-center items-start m-auto xl:h-[450px] h-auto min-h-auto max-h-[65vh]">
            <ReportsChart props={chartData} />
          </div>
        ) : (
          <Typography
            className="text-center flex flex-col justify-center items-center gap-3"
            variant="body1"
            type="div"
            color="neutral"
          >
            <span className="bg-gray-100 rounded-full p-5">
              <BaseIcon
                icon={!error ? calendarBlankDuotone : calendarXDuotone}
                size="responsive"
                color={!error ? 'teal' : 'yellow'}
              />
            </span>
            {message}
          </Typography>
        )}
      </LoadingWrapper>
    </Card>
  );
}
