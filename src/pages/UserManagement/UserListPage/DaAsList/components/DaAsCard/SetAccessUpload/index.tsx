import { useTranslation } from 'react-i18next';

import { DaAsParams } from '@src/services/users/types';
import ToolTip from '@ui/atoms/Tooltip';
import gear from '@iconify-icons/ph/gear';
import { IconButton } from '@ui/atoms/BaseButton';

import { OnClickActionsType } from '../types';

type PropsType = {
  daas: DaAsParams;
  onClickActions?: OnClickActionsType;
};

export function SetAccessUpload({ daas, onClickActions }: PropsType) {
  const { t } = useTranslation();
  return (
    <ToolTip tooltip={t('global.setting')}>
      <IconButton
        icon={gear}
        onClick={() => {
          if (onClickActions) onClickActions('edit', daas);
        }}
      />
    </ToolTip>
  );
}
