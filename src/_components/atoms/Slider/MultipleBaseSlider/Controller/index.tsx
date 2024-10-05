import { Controller, FieldValues } from 'react-hook-form';

import { MultipleBaseSlider } from '../MultipleBaseSlider';
import { MultipleBaseSliderControllerProps } from '../../types';

interface MultiRange {
  min: number;
  max: number;
}
export function MultipleBaseSliderController<T extends FieldValues>(
  props: MultipleBaseSliderControllerProps<T>
) {
  const { minValue, maxValue, showLabel, control, name } = props;

  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <MultipleBaseSlider
            minValue={minValue}
            maxValue={maxValue}
            defaultMinValue={field.value.min}
            defaultMaxValue={field.value.max}
            showLabel={showLabel}
            onChange={(range: MultiRange) => {
              field.onChange({ min: range.min, max: range.max });
            }}
          />
        )}
      />
    </div>
  );
}
