import { Control, FieldPath, FieldValues } from 'react-hook-form';

export interface BaseSliderProps {
  minValue: number;
  maxValue: number;
  defaultValue?: number;
  showLabel?: boolean;
  onChange: (range: Omit<RangeType, 'min'>) => void;
}

export interface MultipleBaseSliderProps
  extends Omit<BaseSliderProps, 'onChange' | 'defaultValue'> {
  defaultMinValue: number;
  defaultMaxValue: number;
  onChange: (range: RangeType) => void;
}

export interface BaseSliderControllerProps<T extends FieldValues>
  extends Omit<BaseSliderProps, 'onChange'> {
  name: FieldPath<T>;
  control: Control<T>;
}
export interface MultipleBaseSliderControllerProps<T extends FieldValues>
  extends Omit<MultipleBaseSliderProps, 'onChange'> {
  name: FieldPath<T>;
  control: Control<T>;
}

type RangeType = { min: number; max: number };
