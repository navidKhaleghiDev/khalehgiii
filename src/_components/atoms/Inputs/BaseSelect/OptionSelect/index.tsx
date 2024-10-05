export interface IOptionSelect {
  id?: string | number;
  value?: string;
  label: string;
}
interface IOptionSelectProps {
  option: IOptionSelect;
}

/**
 * OptionSelect component
 *
 * This component renders a single <option> element for use within a <select>.
 *
 * @component
 *
 * @param {OptionSelectProps} props - The props for the OptionSelect component.
 * @param {IOptionSelect} props.option - The option object containing the value and label for the option element.
 *
 * @returns {JSX.Element} The rendered OptionSelect component.
 */

export function OptionSelect(props: IOptionSelectProps): JSX.Element {
  const { option } = props;
  return (
    <option value={option.value} className="appearance-none text-gray-400">
      {option.label}
    </option>
  );
}
