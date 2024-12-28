import plusIcon from '@iconify-icons/ph/plus';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { ToolTip } from '@ui/atoms/Tooltip';
import { IconButton } from '@ui/atoms/BaseButton';

interface ButtonAddProps {
  label: string;
  onClick?: () => void;
}

export function ButtonAdd({ label = '', onClick }: ButtonAddProps) {
  const { lang } = useLanguage();
  const position = lang === 'fa' ? 'right' : 'left';

  const { t } = useTranslation();
  return (
    <ToolTip tooltip={t(label)} position={position}>
      <IconButton icon={plusIcon} color="teal" size="lg" onClick={onClick} />
    </ToolTip>
  );
}
