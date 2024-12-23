import { useRef, useState } from 'react';

import PhCaretDown from '@iconify-icons/ph/caret-down';
import PhCaretUp from '@iconify-icons/ph/caret-up';

import { Typography } from '@ui/atoms/Typography';
import { BaseCheckBox } from '@ui/atoms/Inputs/BaseCheckBox';
import { BaseIcon } from '@ui/atoms/BaseIcon';
import { ChipButton } from '@ui/atoms/ChipButton';
import { LoadingSvg } from '@ui/atoms/Svgs';
import { useClickOutside } from '@src/helper/hooks/useClickOutside';

import { BaseDropdownProps, OptionSelect, StateType } from './type';
import { baseDropDownStyles, optionSelectStyles } from './styles';

/**
 * A customizable dropdown component that supports single and multiple selection,
 * loading state, error display, and direction-based layout.
 *
 * @param {BaseDropdownProps} props - The props for the dropdown component.
 * @param {OptionSelect[]} props.options - The list of options to display in the dropdown.
 * @param {string} [props.placeHolder] - The placeholder text when no option is selected.
 * @param {string} [props.size] - The size of the dropdown (e.g., 'sm', 'md', 'lg').
 * @param {boolean} [props.fullWidth] - Whether the dropdown should take up the full width of its container.
 * @param {string} [props.name] - The name attribute for the input element.
 * @param {string} [props.label] - The label to display for the dropdown.
 * @param {boolean} [props.loading] - Whether the dropdown is in a loading state.
 * @param {boolean} [props.multiple] - Whether the dropdown allows multiple selections.
 * @param {boolean} [props.disabled] - Whether the dropdown is disabled.
 * @param {string} [props.error] - Error message to display if there is an error.
 * @param {string} [props.dir='rtl'] - The text direction, either 'ltr' (left-to-right) or 'rtl' (right-to-left).
 * @param {function} [props.onChange] - Callback function called when the selection changes.
 *
 * @returns {JSX.Element} The rendered BaseDropdown component.
 */

const initialState: StateType = {
  activeOption: null,
  openOptions: false,
};

export function BaseDropdown(props: BaseDropdownProps): JSX.Element {
  const {
    options,
    placeHolder,
    size,
    fullWidth,
    name,
    label,
    loading,
    multiple,
    disabled,
    error,
    dir = 'rtl',
    onChange,
  } = props;
  const rtl = dir === 'rtl';
  const [state, setState] = useState<StateType>(initialState);
  const [value, setValue] = useState<OptionSelect | OptionSelect[] | null>(
    multiple ? [] : null
  );

  const ref = useRef(null);

  useClickOutside({
    ref,
    setValue: () => setState((prev) => ({ ...prev, openOptions: false })),
    value: state.openOptions,
  });

  const toggleOpen = () => {
    if (loading || disabled) return;
    setState((prev) => ({ ...prev, openOptions: !prev.openOptions }));
  };

  const handleOnChange = (option: OptionSelect) => {
    let newValue;

    if (multiple) {
      const isSelected = (value as OptionSelect[])?.some(
        (v) => v.id === option.id
      );
      newValue = isSelected
        ? (value as OptionSelect[]).filter((v) => v.id !== option.id)
        : [...((value as OptionSelect[]) || []), option];
      setValue(newValue);
    } else {
      newValue = option;
      setValue(option);
    }

    setState({ activeOption: newValue, openOptions: false });

    if (onChange) {
      onChange(newValue);
    }
  };

  const removeAll = () => {
    const resetValue = multiple ? [] : null;
    setState(initialState);
    setValue(resetValue);

    if (onChange) {
      onChange(resetValue);
    }
  };

  return (
    <div dir={dir} className="relative" ref={ref}>
      {label && (
        <label
          htmlFor={name}
          className="flex ltr:justify-end text-gray-500 mb-[0.12rem]"
        >
          <Typography variant="body6">{label}</Typography>
        </label>
      )}
      <div
        aria-hidden
        onClick={toggleOpen}
        className={baseDropDownStyles({
          fullWidth,
          selected: !!state.activeOption,
          intent: error ? 'error' : 'default',
          size,
          disabled,
        })}
      >
        {loading ? (
          <div className="w-full flex justify-center">
            <LoadingSvg type="neutral" />
          </div>
        ) : (
          <div className="flex w-full justify-between ltr:flex-row-reverse items-center ">
            <div
              className={`flex items-center gap-3 overflow-hidden ${
                error && 'text-gray-900 dark:text-white'
              }`}
            >
              {multiple && (value as OptionSelect[])?.length >= 1
                ? options
                    .filter((option) =>
                      (value as OptionSelect[])?.some((v) => v.id === option.id)
                    )
                    .slice(0, 2)
                    .map((option) => (
                      <div key={option.label} className="overflow-hidden">
                        <ChipButton
                          onClick={() => {
                            const filteredData = (
                              value as OptionSelect[]
                            ).filter((v) => v.id !== option.id);
                            setValue(filteredData);
                            setState({
                              activeOption: filteredData,
                              openOptions: false,
                            });

                            if (onChange) {
                              onChange(filteredData);
                            }
                          }}
                          label={option.label}
                        />
                      </div>
                    ))
                : (value as OptionSelect)?.label || placeHolder}
              {(value as OptionSelect[])?.length >= 1 && (
                <Typography>{(value as OptionSelect[])?.length}+</Typography>
              )}
            </div>
            <BaseIcon icon={!state.openOptions ? PhCaretDown : PhCaretUp} />
          </div>
        )}
      </div>

      <div
        className={optionSelectStyles({
          isShow: state.openOptions,
          fullWidth,
          size,
        })}
      >
        {value && (
          <button
            type="button"
            className={`w-full h-6 flex items-center px-3 hover:bg-gray-100 dark:hover:bg-gray-500 rounded-md ${
              !rtl ? 'text-left' : 'text-right'
            }`}
            onClick={removeAll}
          >
            {multiple ? 'Remove All' : 'Remove'}
          </button>
        )}

        {options.map((option: OptionSelect) => (
          <div
            className={`w-full h-6 flex items-center px-3 hover:bg-gray-100  dark:hover:bg-gray-500 rounded-md cursor-pointer ${
              !rtl ? 'text-left' : 'text-right'
            }`}
            key={option.id}
          >
            {multiple ? (
              <div className="flex items-center gap-3">
                <BaseCheckBox
                  label={option.label}
                  id={option.id.toString()}
                  name={option.label}
                  size="sm"
                  checked={(value as OptionSelect[])?.some(
                    (v) => v.id === option.id
                  )}
                  onChange={() => handleOnChange(option)}
                />
              </div>
            ) : (
              <button
                type="button"
                className="w-full text-right ltr:text-left"
                onClick={() => handleOnChange(option)}
              >
                {option.label}
              </button>
            )}
          </div>
        ))}
      </div>
      {error && (
        <Typography color="red" variant="body6" className="h-6">
          {error}
        </Typography>
      )}
    </div>
  );
}
