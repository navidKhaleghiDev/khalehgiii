import { cardStyles } from './styles';
import { ICard } from './types';

export function Card({
  children,
  className,
  rounded,
  borderColor,
  border,
  color,
  shadow,
}: ICard) {
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
