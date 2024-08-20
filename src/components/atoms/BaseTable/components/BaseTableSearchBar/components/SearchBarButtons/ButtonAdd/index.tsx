import { IconButton } from '@ui/atoms/BaseButton';
import ToolTip from '@ui/atoms/Tooltip';
import plusIcon from '@iconify-icons/ph/plus';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';

interface IButtonAdd {
  label: string;
  onClick?: () => void;
}

export function ButtonAdd({ label = '', onClick }: IButtonAdd) {
  const { lang } = useLanguage();
  const position = lang === 'fa' ? 'right' : 'left';

  const { t } = useTranslation();
  return (
    <ToolTip tooltip={t(label)} position={position}>
      <IconButton icon={plusIcon} color="teal" size="lg" onClick={onClick} />
    </ToolTip>
  );
}
