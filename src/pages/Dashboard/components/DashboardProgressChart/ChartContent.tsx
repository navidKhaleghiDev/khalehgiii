import { NoReportChart } from '@ui/atoms/Svgs';
import { ChartRenderer } from '@ui/molecules/Charts/ChartRenderer';

type Dataset = {
  label: string;
  data: Array<{ x: string; y: number }>;
  borderColor: string;
  backgroundColor: string;
};

export function ChartContent({
  chartType,
  datasets,
}: {
  chartType: 'line' | 'bar';
  datasets: Dataset[];
}) {
  if (datasets[0].data.length > 0 || datasets[1].data.length > 0) {
    return <ChartRenderer datasets={datasets} chartType={chartType} />;
  }
  return (
    <div className="self-center w-full h-auto dark:bg-gray-700 bg-gray-50 rounded-2xl">
      <NoReportChart className="max-w-[31.25rem] w-full sm:h-[15.625rem] h-auto" />
    </div>
  );
}
