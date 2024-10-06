import { cardStyles } from './styles';
import type { CardProps } from './types';

export function Card(props: CardProps) {
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
