import { useNavigate } from 'react-router-dom';
import arrowLineLeft from '@iconify-icons/ph/arrow-line-left';

import { useTranslation } from 'react-i18next';
import { useLanguage } from '@context/settings/languageContext';
import { BaseButton, IconButton } from '../BaseButton';

export type BackButtonProps = {
  withLabel?: boolean;
  onClick?: () => void;
  className?: string;
};

export function BackButton({ withLabel, onClick, className }: BackButtonProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { lang } = useLanguage();

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
      label={t('global.pageBack')}
      onClick={handleClick}
      className={'z-50' && className}
      endIcon={lang === 'fa' ? arrowLineLeft : 'null'}
      startIcon={lang === 'en' ? arrowLineLeft : 'null'}
    />
  );
}
