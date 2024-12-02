import { NoReportChart } from '@redesignUi/atoms/Svgs';
import { TimeScaleChart } from '@redesignUi/molecules/Charts/TimeScaleChart';
import { VerticalBarChart } from '@redesignUi/molecules/Charts/VerticalBarChart';

export function ChartContent({
  chartType,
  datasets,
}: {
  chartType: string;
  datasets: any[];
}) {
  if (datasets[0].data.length > 0 || datasets[1].data.length > 0) {
    if (chartType === 'line') {
      return <TimeScaleChart datasets={datasets} />;
    }
    return <VerticalBarChart datasets={datasets} />;
  }
  return (
    <div className="self-center w-full h-auto dark:bg-gray-700 bg-gray-50 rounded-2xl">
      <NoReportChart className="max-w-[31.25rem] w-full sm:h-[15.625rem] h-auto" />
    </div>
  );
}
