import { useNavigate } from "react-router-dom";
import arrowLineLeft from "@iconify-icons/ph/arrow-line-left";

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
      icon={arrowLineLeft}
      size="xl"
      type="button"
      color="teal"
      className={className}
    />
  ) : (
    <BaseButton
      label="صفحه قبل"
      onClick={handleClick}
      endIcon={arrowLineLeft}
      className={className}
    />
  );
}
