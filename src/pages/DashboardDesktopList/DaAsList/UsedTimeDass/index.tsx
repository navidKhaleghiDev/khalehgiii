import { Typography } from '@ui/atoms';
import { useLanguage } from '@context/settings/languageContext';
import { useTranslation } from 'react-i18next';

export function UsedTimeDass({ time }: any) {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  let formattedTime;
  let hours;

  switch (true) {
    case typeof time === 'string':
      formattedTime = time;
      break;
    case time >= 60:
      hours = Math.floor(time / 60);
      formattedTime = `${hours} ${t('global.hour')} `;
      break;
    default:
      formattedTime = `${Math.floor(time)} ${t('global.minute')}`;
  }

  return (
    <div
      className="w-full text-center break-words uppercase"
      dir={lang === 'en' ? 'ltr' : 'rtl'}
    >
      <Typography size="body4">{formattedTime}</Typography>
    </div>
  );
}
