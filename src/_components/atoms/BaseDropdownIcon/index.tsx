import { useRef, useState } from 'react';

import { useClickOutside } from '@src/helper/hooks/useClickOutside';

import { DropdownProps, IOptionSelect, StateType } from './type';
import { optionSelectStyles } from './styles';
import { BaseButton, IconButton } from '../BaseButton';

/**
 *
 * @param {DropdownProps} props  The properties passed to the component.
 * @param {IOptionSelect[]} props.options  Array of options to be displayed in the dropdown.
 * @param {boolean} [props.fullWidth]  Optional. If true, the dropdown will take full width.
 * @param {string} [props.size]  Optional. Defines the size of the dropdown and its options.
 * @param {string} [props.containerClassName]  Optional. Additional class names for the dropdown container.
 * @param {React.ReactNode} props.icon  The icon to be displayed in the button.
 * @param {function(string): void} props.onSelect  Callback function that receives the selected option's ID.
 *
 * @returns {JSX.Element} The BaseDropdownIcon component.
 */

const initState = {
  activeOption: null,
  openOptions: false,
};

export function BaseDropdownIcon(props: DropdownProps): JSX.Element {
  const { options, fullWidth, size, containerClassName, icon, onSelect } =
    props;
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
        size="md"
        color="neutral"
        className={`${
          state.openOptions
            ? '!bg-gray-200 text-gray-900 dark:!bg-gray-800 dark:text-gray-100 dark:border-none'
            : 'bg-gray-100 hover:bg-gray-300 transition-all duration-500 ease-linear'
        }`}
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
            type="neutral"
            label={option.label}
            key={option.id}
            size={size}
            className="w-full p-3 border-none dark:hover:!bg-gray-500 dark:hover:text-white"
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
