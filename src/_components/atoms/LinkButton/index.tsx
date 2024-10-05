import { Link } from 'react-router-dom';
import { BaseButton } from '@ui/atoms';
import { BaseButtonProps } from '../BaseButton/types';

interface LinkButtonProps extends BaseButtonProps {
  link: string;
  skip?: boolean;
}

/**
 * This LinkButton component combines a button with a link.
 * It supports different button properties and conditionally wraps the button with a link.
 *
 * @component
 *
 * @param {Object} props - The properties for the LinkButton component.
 * @param {string} props.link - The URL to navigate to when the button is clicked.
 * @param {boolean} [props.skip] - If true, the button is rendered without a link.
 * @param {() => void} [props.onClick] - Click handler function.
 * @param {string} [props.label] - The text label of the button.
 * @param {boolean} [props.disabled] - If true, the button is disabled.
 * @param {boolean} [props.submit] - If true, the button is of type submit.
 * @param {string} [props.className] - Additional class names for the button.
 * @param {string} [props.startIcon] - Icon to display at the start of the button.
 * @param {string} [props.endIcon] - Icon to display at the end of the button.
 * @param {boolean} [props.loading] - If true, shows a loading spinner instead of the label.
 * @param {string} [props.size] - The size of the button ('sm', 'md', 'lg').
 * @param {string} [props.type] - The type of the button ('primary', 'secondary', etc.).
 * @param {boolean} [props.fullWidth] - If true, the button takes full width of its container.
 *
 * @returns {JSX.Element} The LinkButton component.
 */

export function LinkButton(props: LinkButtonProps): JSX.Element {
  const {
    link,
    skip,
    onClick,
    label,
    disabled,
    submit,
    className,
    startIcon,
    endIcon,
    loading,
    size,
    type,
    fullWidth,
  } = props;

  const button = (
    <BaseButton
      onClick={onClick}
      label={label}
      disabled={disabled}
      submit={submit}
      className={className}
      startIcon={startIcon}
      endIcon={endIcon}
      loading={loading}
      size={size}
      type={type}
      fullWidth={fullWidth}
    />
  );

  return !skip ? <Link to={link}>{button}</Link> : button;
}
