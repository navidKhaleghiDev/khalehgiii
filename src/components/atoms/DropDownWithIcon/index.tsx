import { useRef, useState } from 'react';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';

import { DropdownProps, IOptionSelect, StateType } from './type';
import { optionSelectStyles } from './styles';
import { IconButton, BaseButton } from '../BaseButton';

const initState = {
  activeOption: null,
  openOptions: false,
};

export function DropDownWithIcon({
  options,
  fullWidth,
  size,
  containerClassName,
  icon,
  onSelect,
}: DropdownProps) {
  const ref = useRef(null);
  const [state, setState] = useState<StateType>(initState);

  const toggleOpen = () =>
    setState((prev) => ({ ...prev, openOptions: !prev.openOptions }));

  useClickOutside({
    ref,
    setValue: () => {
      setState((prev) => ({ ...prev, openOptions: false }));
    },
    value: state.openOptions,
  });

  const handleOnChange = (option: IOptionSelect) => {
    setState({ activeOption: option, openOptions: false });
  };

  return (
    <div
      className={`relative ${containerClassName} ${fullWidth && 'w-full'}`}
      ref={ref}
    >
      <IconButton
        icon={icon}
        onClick={toggleOpen}
        size="xl"
        className="rounded-3xl"
        color="teal"
      />
      <div
        className={optionSelectStyles({
          isShow: state.openOptions,
          fullWidth,
          size,
        })}
      >
        {options.map((option: IOptionSelect) => (
          <BaseButton
            type="tealLink"
            label={option.label}
            key={option.id}
            className="w-full p-3 text-right text-teal-600 hover:bg-gray-200"
            onClick={() => {
              handleOnChange(option);
              onSelect(option.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}
