import { useCallback, useRef, useState } from 'react';

import { getValueStyles, sliderStyles, thumbStyles } from '../styles';
import { MultipleBaseSliderProps } from '../types';

/**
 * @component
 * @param {MultipleBaseSliderProps} props The props for MultipleBaseSliderProps component.
 * @param {number} props.min - The minimum value of the slider
 * @param {number} props.max - The maximum value of the slider
 * @param {number} props.initialMin - The initialMin value
 * @param {number} props.initialMax - The initialMax value
 * @param {boolean} props.hiddenLabel -Hidden value of the slider
 * @param {(values: { min: number, max: number }) => void} [props.onChange] - The onChnage method just gives us the max and min value
 * @returns {JSX.Element} The rendered component
 */

export function MultipleBaseSlider(
  props: MultipleBaseSliderProps
): JSX.Element {
  const {
    minValue = 0,
    maxValue = 100,
    defaultMinValue,
    defaultMaxValue,
    showLabel,
    onChange,
  } = props;
  const [min, setMinValue] = useState(defaultMinValue);
  const [max, setMaxValue] = useState(defaultMaxValue);
  const sliderRef = useRef<HTMLDivElement>(null);

  const percent = (value: number) =>
    ((value - minValue) / (maxValue - minValue)) * 100;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>, thumb: string) => {
      const start = e.clientX;
      const startValue = thumb === 'minValue' ? min : max;

      const onMouseMove = (moveEvent: { clientX: number }) => {
        if (!sliderRef.current) return;

        const dx = moveEvent.clientX - start;
        const sliderWidth = sliderRef.current.offsetWidth;

        if (sliderWidth === 0) return;

        const percentMoved = (dx / sliderWidth) * (maxValue - minValue);
        const newValue = startValue + percentMoved;
        const nonNegative = Math.max(
          minValue,
          Math.min(maxValue, +newValue.toFixed())
        );
        const newValueRound = nonNegative;

        if (thumb === 'minValue' && +newValueRound <= max) {
          setMinValue(+newValueRound);
          if (onChange) onChange({ min: +newValueRound, max });
        } else if (thumb === 'maxValue' && +newValueRound >= min) {
          setMaxValue(+newValueRound);
          if (onChange)
            onChange({
              min,
              max: +newValueRound,
            });
        }
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [min, max, minValue, maxValue, onChange]
  );

  return (
    <div className="w-64 h-6 m-5 ltr:" style={{ direction: 'ltr' }}>
      <div className="relative w-64 h-1" ref={sliderRef}>
        <div className={sliderStyles({ background: 'range' })} />

        <div
          className={sliderStyles({ background: 'fill' })}
          style={{
            left: `${percent(min)}%`,
            width: `${percent(max) - percent(min)}%`,
          }}
        />
        <div
          className={thumbStyles()}
          style={{ left: `${percent(min)}%` }}
          onPointerDown={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseDown(e, 'minValue')
          }
          tabIndex={0}
          role="button"
        >
          {showLabel && <span className={getValueStyles()}>{min}</span>}
        </div>
        <div
          className={thumbStyles()}
          style={{ left: `${percent(max)}% ` }}
          onPointerDown={(e: React.MouseEvent<HTMLDivElement>) =>
            handleMouseDown(e, 'maxValue')
          }
          tabIndex={0}
          role="button"
        >
          {showLabel && <span className={getValueStyles()}>{max}</span>}
        </div>
      </div>
    </div>
  );
}
