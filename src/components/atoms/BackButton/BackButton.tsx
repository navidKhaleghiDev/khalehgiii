import { useNavigate } from "react-router-dom";
import { BaseButton, IconButton } from "../BaseButton";

export type BackButtonProps = {
  withLabel?: boolean;
  onClick?: () => void;
  className?: string;
};

export function BackButton({ withLabel, onClick, className }: BackButtonProps) {
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
      className={className}
    />
  ) : (
    <BaseButton
      label="صفحه قبل"
      onClick={handleClick}
      endIcon="ph:arrow-line-left"
      className={className}
    />
  );
}
