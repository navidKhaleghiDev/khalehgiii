import { useCallback, useRef, useState } from 'react';

import { getValueStyles, sliderStyles, thumbStyles } from '../styles';
import { BaseSliderProps } from '../types';

/**
 * @component
 * @param {BaseSlider} props The props for BaseSlider component.
 * @param {number} props.min - The minimum value of the slider
 * @param {number} props.max - The maximum value of the slider
 * @param {number} props.initialValue - The initial value
 * @param {boolean} props.hiddenLabel -Hidden value of
 * @param {(values: { min: number, max: number }) => void} [props.onChange] - The onChnage method just gives us the max value
 * @returns {JSX.Element} The rendered component
 */

export function BaseSlider(props: BaseSliderProps): JSX.Element {
  const {
    minValue = 0,
    maxValue = 100,
    defaultValue = 0,
    showLabel,
    onChange,
  } = props;
  const [value, setValue] = useState(Math.max(defaultValue, 0));
  const sliderRef = useRef<HTMLDivElement>(null);

  const percent = (item: number) =>
    ((item - minValue) / (maxValue - minValue)) * 100;

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const start = e.clientX;
      const startValue = value;

      const onMouseMove = (moveEvent: MouseEvent) => {
        if (!sliderRef.current) return;

        const dx = moveEvent.clientX - start;
        const sliderWidth = sliderRef.current.offsetWidth;

        if (sliderWidth === 0) return;

        const percentMoved = (dx / sliderWidth) * (maxValue - minValue);
        const newValue = startValue + percentMoved;
        const nonNegative = newValue.toFixed();
        const newValueRound = nonNegative;
        if (+newValueRound >= minValue && +newValueRound <= maxValue) {
          setValue(+newValueRound);
          if (onChange) onChange({ max: Math.abs(+newValueRound) });
        }
      };

      const onMouseUp = () => {
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
      };

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
    },
    [value, minValue, maxValue, onChange]
  );

  return (
    <div className="w-64 h-6 m-5" style={{ direction: 'ltr' }}>
      <div className="relative w-64 h-1" ref={sliderRef}>
        <div className={sliderStyles({ background: 'range' })} />

        <div
          className={sliderStyles({ background: 'fill' })}
          style={{
            width: `${percent(value)}%`,
          }}
        />
        <div
          className={thumbStyles()}
          style={{ left: `${percent(value)}%` }}
          onPointerDown={handleMouseDown}
          tabIndex={0}
          role="button"
        >
          {showLabel && (
            <span className={getValueStyles()}>{value.toFixed()}</span>
          )}
        </div>
      </div>
    </div>
  );
}
