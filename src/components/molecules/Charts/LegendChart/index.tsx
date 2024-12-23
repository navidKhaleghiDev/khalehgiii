import { VariantProps } from 'class-variance-authority';

import { Typography } from '@ui/atoms';

import { LegendStyles } from './styles';

export interface LegendProps extends VariantProps<typeof LegendStyles> {
  description: string;
}

export function LegendChart(props: LegendProps) {
  const { description, color } = props;

  return (
    <Typography
      variant="body5"
      color="neutral"
      className={LegendStyles({ color })}
    >
      {description}
    </Typography>
  );
}
