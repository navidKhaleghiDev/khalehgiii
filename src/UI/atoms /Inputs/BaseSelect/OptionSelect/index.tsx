export interface OptionSelectProps {
  id?: string | number;
  value?: string;
  label: string;
}
interface OptionsSelectProps {
  option: OptionSelectProps;
}

/**
 * OptionSelect component
 *
 * This component renders a single <option> element for use within a <select>.
 *
 * @component
 *
 * @param {OptionSelectProps} props - The props for the OptionSelect component.
 * @param {OptionSelectProps} props.option - The option object containing the value and label for the option element.
 *
 * @returns {JSX.Element} The rendered OptionSelect component.
 */

export function OptionSelect(props: OptionsSelectProps): JSX.Element {
  const { option } = props;
  return (
    <option value={option.value} className="appearance-none text-gray-400">
      {option.label}
    </option>
  );
}
