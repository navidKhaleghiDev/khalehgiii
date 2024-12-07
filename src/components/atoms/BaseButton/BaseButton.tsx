import { useTranslation } from 'react-i18next';
import { baseButtonStyles, iconInButtonStyles } from './styles';
import { BaseButtonProps } from './types';
import { BaseIcon } from '../BaseIcon';
import { LoadingSvg } from '../Svgs/LoadingSvg';

export function BaseButton({
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
}: BaseButtonProps) {
  const { t } = useTranslation();
  return (
    <button
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={disabled || loading}
      className={baseButtonStyles({
        type,
        fullWidth,
        size,
        className,
      })}
    >
      {startIcon && !loading && (
        <BaseIcon
          icon={startIcon}
          className={iconInButtonStyles({
            type,
            size,
            className: `${size !== 'sm' && 'mr-4'}`,
          })}
        />
      )}
      {loading ? <LoadingSvg /> : t(label)}
      {endIcon && !loading && (
        <BaseIcon
          icon={endIcon}
          className={iconInButtonStyles({
            type,
            className: `${size !== 'sm' && 'mr-4'}`,
          })}
        />
      )}
    </button>
  );
}
