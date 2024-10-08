import { cardStyles } from './styles';
import type { CardProps } from './types';

/**
 * Card Component
 *
 * A customizable card component that supports different styles, colors, borders, and shadow effects.
 * It serves as a container for content passed via the `children` prop.
 *
 * @component
 *
 * @param {Object} props - The props for the Card component.
 * @param {React.ReactNode} props.children - The content to be displayed inside the card.
 * @param {string} [props.className] - Additional custom className for styling the card.
 * @param {string} [props.rounded] - The border-radius style for the card, e.g., 'xxl' for extra large rounded corners.
 * @param {string} [props.borderColor] - The color of the border around the card.
 * @param {boolean} [props.border] - Whether to show a border around the card.
 * @param {string} [props.color] - The background color of the card.
 * @param {string} [props.shadow] - The shadow style for the card, e.g., 'sm' for a small shadow.
 *
 * @returns {JSX.Element} Returns the rendered Card component.
 */
export function Card(props: CardProps): JSX.Element {
  const { children, className, rounded, borderColor, border, color, shadow } =
    props;
  return (
    <div
      className={cardStyles({
        color,
        shadow,
        className,
        rounded,
        borderColor,
        border,
      })}
    >
      {children}
    </div>
  );
}
