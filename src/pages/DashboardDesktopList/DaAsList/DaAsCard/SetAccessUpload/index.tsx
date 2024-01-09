import { IDaAs } from '@src/services/users/types';
import ToolTip from '@ui/atoms/Tooltip';
import { OnClickActionsType } from '../types';
import gear from '@iconify-icons/ph/gear';
import { IconButton } from '@ui/atoms/BaseButton';
import { useTranslation } from 'react-i18next';

type PropsType = {
  daas: IDaAs;
  onClickActions?: OnClickActionsType;
};

export function SetAccessUpload({ daas, onClickActions }: PropsType) {
  const { t } = useTranslation();
  return (
    <ToolTip tooltip={t('global.setting')}>
      <IconButton
        icon={gear}
        onClick={() => {
          onClickActions && onClickActions('edit', daas);
        }}
      />
    </ToolTip>
  );
}
