import { VariantProps } from 'class-variance-authority';
import { selectStyles } from './styles';

export type OptionType = { id: string; label: string; value: string };

export interface ICard extends VariantProps<typeof selectStyles> {
  className?: string;
  label: string;
  options?: OptionType[];
}
