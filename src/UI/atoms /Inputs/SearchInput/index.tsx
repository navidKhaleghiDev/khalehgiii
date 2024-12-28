import { useEffect, useState } from 'react';

import { useDebounce } from '@src/helper/hooks/useDebounce';
import PhMagnifyingGlass from '@iconify-icons/ph/magnifying-glass';

import { BaseInput } from '../BaseInput';
import { SearchInputProps } from './types';

/**
 * SearchInputComponent is a controlled input component that allows for debounced user input.
 *
 * @param {SearchInputProps} props - The properties for the search input component.
 * @param {string} props.id - The id for the input element.
 * @param {string} props.name - The name for the input element.
 * @param {(value: string) => void} props.onChange - The function to handle input value changes, triggered with the debounced value.
 * @param {string} props.value - The current value of the input.
 * @param {string} [props.className] - Optional additional CSS class names for styling.
 * @param {boolean} [props.disabled] - Whether the input is disabled.
 * @param {string} [props.error] - Whether the input is in an error state.
 * @param {boolean} [props.fullWidth] - If true, the input will take up the full width of its container.
 * @param {string} [props.helpText] - Optional help text displayed below the input.
 * @param {boolean} [props.hiddenError] - If true, the error message will be visually hidden.
 * @param {string} [props.label] - Label for the input element.
 * @param {string} [props.placeholder] - Placeholder text for the input.
 * @param {sm | md | lg} [props.size] - The size of the input element (e.g., small, medium, large).
 * @param {string} [props.dir='rtl'] - Text direction for the input, either 'rtl' or 'ltr'.
 *
 * @returns {JSX.Element} The rendered search input component.
 */

export function SearchInput(props: SearchInputProps): JSX.Element {
  const {
    id,
    name,
    onChange,
    value,
    className,
    disabled,
    fullWidth,
    helpText,
    label,
    hiddenError,
    error,
    placeholder,
    size,
    dir = 'rtl',
  } = props;
  const [searchValue, setSearchValue] = useState(value);
  const debouncedSearchValue = useDebounce(searchValue, 100);
  const rtl = dir === 'rtl';

  useEffect(() => {
    onChange(debouncedSearchValue);
  }, [debouncedSearchValue, onChange]);

  return (
    <BaseInput
      type="text"
      name={name}
      size={size}
      id={id}
      onChange={(event) => setSearchValue(event.target.value)}
      value={value}
      dir={dir}
      helpText={helpText}
      disabled={disabled}
      hiddenError={hiddenError}
      autoComplete="off"
      endIcon={!rtl ? PhMagnifyingGlass : ''}
      label={label}
      placeholder={placeholder}
      error={error}
      startIcon={rtl ? PhMagnifyingGlass : ''}
      fullWidth={fullWidth}
      className={className}
    />
  );
}
