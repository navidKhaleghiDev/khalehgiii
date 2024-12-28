import { badgeStyle } from './styles';
import { BadgeProps } from './types';

/**
 * StatusCircle is a UI component that renders a circle with optional content inside.
 *
 * @component
 * @param {string | number} [props.content] - The content to display inside the circle (e.g., a number or a short text).
 * @param {'sm' | 'md' | 'lg'| 'responsive' | 'default'} [props.size] - The size of the circle. 'sm' for small, 'md' for medium, 'lg' for large, 'responsive' for responsive and 'default' for default size.
 * @param {string} [props.className] - Additional custom class names for the container.
 * @param {string} [props.color] - The background color of the circle.
 * @param {'ltr' | 'rtl'} [props.dir='rtl'] - The direction of the component. 'ltr' for left-to-right, 'rtl' for right-to-left (default is 'rtl').
 * @param {boolean} [props.disabled] - If true, disables has opacity-40.

 *
 * @returns {JSX.Element} Returns the rendered StatusCircle component.
 */

export function Badge(props: BadgeProps): JSX.Element {
  const { content, size, color, disabled, className } = props;

  const getContentFormatter = (count: BadgeProps['content']) => {
    // handle null value
    if (!count) {
      return '';
    }

    // handle negative value
    if (count < 0) {
      return 0;
    }

    // show value above 99
    return count > 99 ? '\u002B\u200E99' : count;
  };

  const contentFormatter = getContentFormatter(content);
  return (
    <div
      className={`ltr:left-0 rtl:right-0 ${badgeStyle({
        size,
        color,
      })} ${disabled && 'opacity-40'} ${className}`}
    >
      {contentFormatter}
    </div>
  );
}
