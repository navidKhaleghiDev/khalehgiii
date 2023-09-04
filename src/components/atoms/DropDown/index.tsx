import { useRef, useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';

import { DropdownProps, IOptionSelect, StateType } from './type';
import { optionSelectStyles, baseDropDownStyles } from './styles';
import { BaseIcon } from '../BaseIcon';
import { Typography } from '../Typography';

export function Dropdown<T extends FieldValues>({
  options,
  fullWidth,
  placeHolder,
  rules,
  control,
  name,
  defaultValue,
  className,
}: DropdownProps<T>) {
  const ref = useRef(null);
  const [state, setState] = useState<StateType>({
    activeOption: null,
    openOptions: false,
  });

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
    <Controller
      name={name}
      control={control}
      rules={rules}
      defaultValue={defaultValue}
      render={({ field: { onChange }, fieldState: { error } }) => (
        <div className="relative" ref={ref}>
          <button
            type="button"
            onClick={toggleOpen}
            className={baseDropDownStyles({
              fullWidth,
              intent: error ? 'error' : 'default',
              className,
            })}
          >
            {state.activeOption?.label ?? placeHolder}
            <BaseIcon
              icon={
                state.openOptions
                  ? `ph:caret-circle-down`
                  : `ph:caret-circle-left`
              }
            />
          </button>

          <div
            className={optionSelectStyles({
              isShow: state.openOptions,
              fullWidth,
            })}
          >
            {options.map((option: IOptionSelect) => (
              <button
                type="button"
                key={option.id}
                className="w-full p-3 text-right text-teal-600 hover:bg-gray-200"
                onClick={() => {
                  handleOnChange(option);
                  onChange(option.id);
                }}
              >
                {option.label}
              </button>
            ))}
          </div>
          <Typography color="red" size="caption" className="h-6">
            {error?.message ?? ''}
          </Typography>
        </div>
      )}
    />
  );
}
