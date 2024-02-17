export interface IOptionSelect {
  id?: string;
  value?: string;
  label: string;
}
interface OptionSelectProps {
  option: IOptionSelect;
}
export function OptionSelect(props: OptionSelectProps) {
  const { option } = props;
  return <option value={option.value}>{option.label}</option>;
}
