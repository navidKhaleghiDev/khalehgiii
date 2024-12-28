import { baseButtonStyles, loadingStyle } from './styles';
import { BaseButtonProps } from './types';
import { BaseIcon } from '../BaseIcon';
import { LoadingSvg } from '../Svgs/LoadingSvg';

/**
 * This BaseButton component renders a customizable button.
 * It supports different sizes, types, icons, and loading states.
 *
 * @component
 *
 * @param {Object} props - The properties for the BaseButton component.
 * @param {() => void} [props.onClick] - Click handler function.
 * @param {string} [props.label] - The text label of the button.
 * @param {boolean} [props.submit] - If true, the button is of type submit.
 * @param {boolean} [props.fullWidth] - If true, the button takes full width of its container.
 * @param {string} [props.className] - Additional class names for the button.
 * @param {string} [props.startIcon] - Icon to display at the start of the button.
 * @param {string} [props.endIcon] - Icon to display at the end of the button.
 * @param {boolean} [props.disabled] - If true, the button is disabled.
 * @param {string} [props.size] - The size of the button ('sm', 'md', 'lg').
 * @param {string} [props.type] - The type of the button ('primary', 'secondary', etc.).
 * @param {boolean} [props.loading] - If true, shows a loading spinner instead of the label.
 *
 * @returns {JSX.Element} The BaseButton component.
 */

export function BaseButton(props: BaseButtonProps): JSX.Element {
  const {
    onClick,
    label,
    submit,
    fullWidth,
    className,
    startIcon,
    endIcon,
    disabled,
    size,
    type,
    loading,
  } = props;
  const baseButtonStyle = loading ? loadingStyle : baseButtonStyles;
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={loading ? undefined : onClick}
      disabled={disabled}
      className={baseButtonStyle({
        type,
        fullWidth,
        size,
        className,
      })}
    >
      {startIcon && !loading && (
        <BaseIcon icon={startIcon} className="fill-current size[0.813rem]" />
      )}
      {loading ? <LoadingSvg type={type} /> : label}
      {endIcon && !loading && (
        <BaseIcon icon={endIcon} className="fill-current size[0.813rem]" />
      )}
    </button>
  );
}
