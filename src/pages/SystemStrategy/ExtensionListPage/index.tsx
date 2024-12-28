import { useTranslation } from 'react-i18next';

import { Typography } from '@ui/atoms';

import { ExtensionList } from './ExtensionList';

export function DashboardExtensionListPage() {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="body2B"
        color="neutralDark"
        className="mb-[1.875rem]"
      >
        {t('systemManagement.formatList')}
      </Typography>
      <ExtensionList />
    </>
  );
}
