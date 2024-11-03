import { VariantProps } from 'class-variance-authority';
import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { OnClickActionsType } from '@redesignUi/molecules/BaseTable/types';

import { ButtonBGStyle, TextBGStyles } from './styles';

interface ButtonProps extends VariantProps<typeof ButtonBGStyle> {
  isButton: true;
  onClick: OnClickActionsType<any>;
  id: any;
  row: any;
}

interface NonButtonProps extends VariantProps<typeof TextBGStyles> {
  isButton?: false;
}

type TextBGProps = {
  title: string;
  translate?: boolean;
} & (ButtonProps | NonButtonProps);

export function TextBG({
  title,
  color,
  translate,
  isButton = false,
  ...props
}: TextBGProps) {
  const { t } = useTranslation();

  if (isButton) {
    const { onClick, row, id } = props as ButtonProps;

    const updatedUnlock = {
      ...row,
      is_lock: !id,
    };

    return (
      <button type="button" onClick={() => onClick('editLock', updatedUnlock)}>
        <Typography className={`${ButtonBGStyle({ color })}`} variant="body5">
          {translate ? t(`${title}`) : title}
        </Typography>
      </button>
    );
  }

  return (
    <Typography className={`${TextBGStyles({ color })}`} variant="body5">
      {translate ? t(`${title}`) : title}
    </Typography>
  );
}
