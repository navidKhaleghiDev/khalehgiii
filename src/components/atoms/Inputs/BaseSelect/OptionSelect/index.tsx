export interface OptionParams {
  id?: string;
  value?: string;
  label: string;
}
interface OptionSelectProps {
  option: OptionParams;
}
export function OptionSelect(props: OptionSelectProps) {
  const { option } = props;
  return <option value={option.value}>{option.label}</option>;
}
