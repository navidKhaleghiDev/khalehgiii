import { useState } from 'react';

import { IconButton } from '@ui/atoms/BaseButton';
import PhPlus from '@iconify-icons/ph/plus';
import PhMinus from '@iconify-icons/ph/minus';
import PhUserLight from '@iconify-icons/ph/user-light';
import { Typography } from '@ui/atoms/Typography';
import { IconInput } from '../IconInput';
import { baseInputStyles } from '../styles';
import { BaseInputNumberProps } from '../types';

export function BaseInputNumber(props: BaseInputNumberProps<any>): JSX.Element {
  const {
    id,
    dir = 'rtl',
    placeholder,
    className,
    fullWidth,
    defaultValue = 0,
    intent,
    size,
    label,
    hiddenError,
    pureError,
    min = 0,
    max = 100,
  } = props;

  const rtl = dir === 'rtl';
  // State to manage the value inside the component
  const [value, setValue] = useState<number>(defaultValue);

  const handleIncrement = () => {
    setValue((prevValue) => (prevValue < max ? prevValue + 1 : prevValue));
  };

  const handleDecrement = () => {
    setValue((prevValue) => (prevValue > min ? prevValue - 1 : prevValue));
  };

  return (
    <div dir={dir} className={`${className ?? ''} ${fullWidth && 'w-full '}`}>
      {label && (
        <label
          htmlFor={id}
          className={`block mb-1 h-8 ${
            rtl ? 'text-left uppercase' : 'text-right'
          }`}
        >
          <Typography color="neutralDark" variant="body4">
            {label}
          </Typography>
        </label>
      )}

      <div className="relative base-input flex items-center ">
        {/* Optional Start Icon */}
        <div className={`${!rtl ? 'absolute right-12' : ''}`}>
          <IconInput icon={PhUserLight} intent={intent} />
        </div>

        <IconButton
          icon={PhPlus}
          onClick={handleIncrement}
          className={baseInputStyles({
            className: `${
              rtl ? 'rounded-l-none border-l-0' : 'rounded-r-none'
            } min-h-10 `,
          })}
        />
        <IconButton
          icon={PhMinus}
          onClick={handleDecrement}
          className={baseInputStyles({
            className: `${
              rtl ? 'rounded-none border-l-0' : 'rounded-none border-l-0'
            } min-h-10 `,
          })}
        />

        {/* Input Field */}
        <input
          id={id}
          type="number"
          dir={dir === 'rtl' ? 'ltr' : 'rtl'}
          value={value}
          onChange={(e) => setValue(Number(e.target.value))}
          className={baseInputStyles({
            intent: pureError ? 'error' : intent,
            className: `${
              rtl
                ? 'rounded-r-none pl-10 pr-8'
                : 'rounded-l-none border-l-0 pr-10 pl-8'
            }   `,
            fullWidth,
            size,
          })}
          placeholder={placeholder}
          min={min}
          max={max}
        />
      </div>

      {/* Error Message */}
      {!hiddenError && pureError && (
        <Typography color="red" variant="body6" className="min-h-5">
          {pureError}
        </Typography>
      )}
    </div>
  );
}
