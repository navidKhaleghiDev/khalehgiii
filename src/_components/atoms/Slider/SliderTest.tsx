import { BaseSlider } from './BaseSlider/BaseSlider';
import { MultipleBaseSlider } from './MultipleBaseSlider/MultipleBaseSlider';

export function SliderTest() {
  const handleSliderChange = (values: { max: number }) => {
    console.log(values.max);
  };

  const handleMultipleSliderChange = (values: { min: number; max: number }) => {
    console.log('min', values.min);
    console.log('max', values.max);
  };

  return (
    <>
      <BaseSlider
        defaultValue={60}
        minValue={0}
        maxValue={100}
        onChange={handleSliderChange}
        showLabel
      />
      <MultipleBaseSlider
        minValue={0}
        maxValue={100}
        defaultMinValue={20}
        defaultMaxValue={50}
        onChange={handleMultipleSliderChange}
        showLabel
      />
    </>
  );
}
