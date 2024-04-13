import { Typography } from '@ui/atoms';
import { useLanguage } from '@context/settings/languageContext';
import { useTranslation } from 'react-i18next';

type TUsedTimeProps = { time: number | string };

export function UsedTimeDass({ time }: TUsedTimeProps) {
  const { t } = useTranslation();
  const { lang } = useLanguage();

  let formattedTime;
  let convertedTime;

  switch (true) {
    case typeof time === 'string':
      formattedTime = time;
      break;
    case typeof time === 'number' && time >= 60:
      convertedTime = Math.floor(time / 60);
      formattedTime = `${convertedTime} ${t('global.hour')} `;
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
