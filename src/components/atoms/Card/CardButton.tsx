import { cardStyles } from './styles';
import { CardButtonProps } from './types';

/**
 * CardButton Component
 *
 * A customizable button component that supports different styles, colors, borders, and shadow effects.
 * The component also handles click events and supports a disabled state.
 *
 * @component
 *
 * @param {Object} props - The props for the CardButton component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the button.
 * @param {string} [props.className] - Additional custom className for styling the button.
 * @param {string} [props.rounded] - The border-radius style for the button, e.g., 'xxl' for extra large rounded corners.
 * @param {string} [props.borderColor] - The color of the border around the button.
 * @param {boolean} [props.border] - Whether to show a border around the button.
 * @param {string} [props.color] - The background color of the button.
 * @param {string} [props.shadow] - The shadow style for the button, e.g., 'sm' for a small shadow.
 * @param {Function} [props.onClick] - Callback function to handle the click event on the button.
 * @param {boolean} [props.disabled] - Whether the button is disabled.
 *
 * @returns {JSX.Element} Returns the rendered CardButton component.
 */
export function CardButton(props: CardButtonProps) {
  const {
    children,
    className,
    rounded,
    borderColor,
    border,
    color,
    shadow,
    onClick,
    disabled,
  } = props;
  return (
    <button
      className={cardStyles({
        color,
        shadow,
        className,
        rounded,
        borderColor,
        border,
      })}
      type="button"
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
