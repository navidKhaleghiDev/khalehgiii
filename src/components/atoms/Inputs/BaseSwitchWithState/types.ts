export interface IBaseSwitchWithState<T> {
  name: string;
  defaultValue?: string;
  defaultChecked?: boolean;
  className?: string;
  ltrLabel?: boolean;
  label?: string;
  disabled?: boolean;
  pureOnChange?: (event: T) => void;
  pureValue?: boolean;
  pureError?: string;
}
