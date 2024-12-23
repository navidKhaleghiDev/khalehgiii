import { VariantProps } from 'class-variance-authority';
import { containerTooltipStyles, tooltipStyles } from './styles';

export interface ToolTipProps
  extends VariantProps<typeof tooltipStyles>,
    VariantProps<typeof containerTooltipStyles> {
  tooltip: string;
  className?: string;
}
