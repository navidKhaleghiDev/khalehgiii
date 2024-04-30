import { cardStyles } from './styles';
import { ICardButton } from './types';

export function CardButton({
  children,
  className,
  rounded,
  borderColor,
  border,
  color,
  shadow,
  onClick,
}: ICardButton) {
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
    >
      {children}
    </button>
  );
}
