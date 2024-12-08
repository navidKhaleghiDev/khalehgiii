import { IconButton } from '@redesignUi/atoms/BaseButton';
import ChartBar from '@iconify-icons/ph/chart-bar-duotone';
import ChartLine from '@iconify-icons/ph/chart-line';

export function ChartToggleButtons({
  setChartType,
}: {
  setChartType: (type: 'line' | 'bar') => void;
}) {
  return (
    <div className="flex gap-2.5 pb-5 items-end justify-self-end">
      <IconButton
        icon={ChartBar}
        color="neutral"
        type="button"
        onClick={() => setChartType('bar')}
        size="md"
      />
      <IconButton
        icon={ChartLine}
        color="neutral"
        type="button"
        onClick={() => setChartType('line')}
        size="md"
      />
    </div>
  );
}
