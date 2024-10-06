import { cardStyles } from './styles';
import { CardButtonProps } from './types';

export function CardButton({
  children,
  className,
  rounded,
  borderColor,
  border,
  color,
  shadow,
  onClick,
  disabled,
}: CardButtonProps) {
  console.log(disabled);

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
