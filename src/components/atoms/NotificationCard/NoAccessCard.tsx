import { NotificationCard } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

export function NoAccessCard() {
  const { t } = useTranslation();

  return <NotificationCard title={t('global.dontHaveAccess')} type="error" />;
}
