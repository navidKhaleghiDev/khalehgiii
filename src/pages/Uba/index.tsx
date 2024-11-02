import { useTranslation } from 'react-i18next';

import { ContainerDashboard } from '@ui/Templates/ContainerDashboard';
import { Typography } from '@redesignUi/atoms';

import { UbaAsList } from './UbaAsList';

export function UbaPage() {
  const { t } = useTranslation();
  return (
    <ContainerDashboard>
      <Typography
        className="w-full justify-self-start xl:mb-[6.25rem] md:mb-10 mb-[1.875rem]"
        variant="body2B"
        color="black"
      >
        {t('dashboard.userBehavior')}
      </Typography>
      <UbaAsList />
    </ContainerDashboard>
  );
}
