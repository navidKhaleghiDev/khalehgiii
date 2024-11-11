import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';

import { UbaAsList } from './UbaAsList';

export function UbaPage() {
  const { t } = useTranslation();
  return (
    <>
      <Typography
        className="w-full justify-self-start mb-[1.875rem]"
        variant="body2B"
        color="black"
      >
        {t('dashboard.userBehavior')}
      </Typography>
      <UbaAsList />
    </>
  );
}
