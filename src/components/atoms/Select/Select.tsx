/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';
import { ICard, OptionType } from './types';
import { BaseButton } from '../BaseButton';

const optionMock = [
  { id: '1', label: 'select one', value: '1' },
  { id: '2', label: 'select tow', value: '2' },
];
export function Select({ label, options = optionMock }: ICard) {
  const ref = useRef(null);
  const [open, setOpen] = useState<boolean>(false);
  useClickOutside({ ref, setValue: setOpen, value: open });

  const handleClickSelected = (_option: OptionType) => {
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <BaseButton
        label={label}
        type={open ? 'default' : 'shadow'}
        endIcon="mingcute:left-fill"
        onClick={() => setOpen(!open)}
      />

      <ul
        className={`${
          !open && 'hidden'
        } z-2 absolute mt-3 w-full rounded bg-gray-50 ring-1 ring-gray-300`}
      >
        {options.map((option) => (
          <BaseButton
            type="tealLink"
            label={option.label}
            key={option.id}
            onClick={() => handleClickSelected(option)}
          />
        ))}
      </ul>
    </div>
  );
}
