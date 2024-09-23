export interface IBaseSwitchWithState<T> {
  name: string;
  defaultValue?: string;
  defaultChecked?: boolean;
  className?: string;
  disabled?: boolean;
  pureOnChange?: (event: T) => void;
  pureValue?: boolean;
  pureError?: string;
}
