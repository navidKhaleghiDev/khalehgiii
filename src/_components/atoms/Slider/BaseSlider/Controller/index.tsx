import { Controller, FieldValues } from 'react-hook-form';

import { BaseSlider } from '../BaseSlider';
import { BaseSliderControllerProps } from '../../types';

export function BaseSliderController<T extends FieldValues>(
  props: BaseSliderControllerProps<T>
) {
  const { minValue, maxValue, showLabel, control, name } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <BaseSlider
          minValue={minValue}
          maxValue={maxValue}
          defaultValue={field.value}
          showLabel={showLabel}
          onChange={(range) => {
            field.onChange(range.max);
          }}
        />
      )}
    />
  );
}
