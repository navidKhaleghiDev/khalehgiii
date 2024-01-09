import { Typography } from '@ui/atoms';
import { useLanguage } from '@context/settings/languageContext';
import { useTranslation } from 'react-i18next';

export function UsedTimeDass({ time }: any) {
  const { t } = useTranslation();
  const { lang } = useLanguage();
  return (
    <div
      className="w-full text-center break-words uppercase"
      dir={lang === 'en' ? 'ltr' : 'rtl'}
    >
      <Typography size="body4">
        {typeof time === 'string'
          ? time
          : `${Math.floor(time)}  ${t('global.minute')}`}
      </Typography>
    </div>
  );
}
