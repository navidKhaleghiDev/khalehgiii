import { useNavigate } from 'react-router-dom';
import { BaseButton, IconButton } from '../BaseButton';

export type BackButtonProps = {
  withLabel?: boolean;
  onClick?: () => void;
};

export function BackButton({ withLabel, onClick }: BackButtonProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!onClick) {
      navigate(-1);
    } else {
      onClick();
    }
  };

  return !withLabel ? (
    <IconButton
      onClick={handleClick}
      icon="ep:back"
      size="xl"
      type="button"
      color="teal"
    />
  ) : (
    <BaseButton
      label="صفحه قبل"
      onClick={handleClick}
      endIcon="ph:arrow-line-left"
    />
  );
}
