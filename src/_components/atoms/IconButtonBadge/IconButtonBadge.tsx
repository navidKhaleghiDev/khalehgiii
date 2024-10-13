import { Badge } from '../Badge';
import { IconButton } from '../BaseButton';
import { IconButtonBadgeProps } from './types';

/**
 * IconButtonBadge Component (Atomic Design - Atom)
 *
 * A component that renders an icon button with an optional badge, often used for displaying notifications or statuses.
 *
 * @component
 *
 * @param {Object} props - The props for the IconButtonBadge component.
 * @param {string | number} [props.content] - The content to display inside the badge. Typically used for numeric values or small text.
 * @param {JSX.Element} props.icon - The icon to display inside the button.
 * @param {string} [props.className] - Additional custom className for the button container.
 * @param {string} [props.classNameIcon] - Additional custom className for the icon element.
 * @param {string} [props.color='neutral'] - The color of the icon button. Defaults to 'neutral'.
 * @param {boolean} [props.loading=false] - If true, the button will show a loading state (e.g., a spinner instead of the icon).
 * @param {Function} [props.onClick] - The function to execute when the button is clicked.
 * @param {'sm' | 'md' | 'lg'} [props.size='lg'] - The size of the button and the badge. 'sm' for small, 'md' for medium, and 'lg' for large.
 * @param {string} [props.type='button'] - The button type (e.g., 'button', 'submit', etc.). Defaults to 'button'.
 * @param {'sm' | 'md'} [props.size='lg'] - The size of the button and the badge. 'sm' for small and 'md' for medium.
 * @param {boolean} [props.disabled=false] - If true, the button will be disabled. Defaults to false.
 * @param {'rtl' | 'ltr'} [props.dir='rtl'] - The text direction. Defaults to 'rtl'.
 *
 * @returns {JSX.Element} Returns the rendered IconButtonBadge component.
 */
export function IconButtonBadge(props: IconButtonBadgeProps): JSX.Element {
  const {
    content,
    icon,
    className,
    classNameIcon,
    color = 'neutral',
    loading,
    onClick,
    type,
    size,
    disabled,
  } = props;
  return (
    <div className={`relative w-fit ${className}`}>
      {content && (
        <Badge
          content={content}
          disabled={disabled}
          size="lg"
          className="!-top-2 !-right-2"
        />
      )}
      <IconButton
        icon={icon}
        classNameIcon={classNameIcon}
        color={color}
        loading={loading}
        onClick={onClick}
        type={type}
        size={size}
        disabled={disabled}
      />
    </div>
  );
}
