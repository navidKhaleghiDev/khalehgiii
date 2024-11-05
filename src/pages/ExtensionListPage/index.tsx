import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';

import { ExtensionList } from './ExtensionList';

export function DashboardExtensionListPage() {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        variant="body2B"
        color="neutralDark"
        className="mb-5 md:mb-[6.25rem]"
      >
        {t('systemManagement.formatList')}
      </Typography>
      <ExtensionList />
    </>
  );
}
