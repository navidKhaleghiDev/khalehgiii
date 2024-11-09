import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';

import { KnowledgeManagementList } from './KnowledgeManagementList';

export function KnowledgeManagementPage() {
  const { t } = useTranslation();

  return (
    <>
      <Typography
        color="black"
        className="text-sm sm:text-xl font-semibold mb-[1.875rem]"
      >
        {t('global.knowledgeManagement')}
      </Typography>
      <KnowledgeManagementList />
    </>
  );
}
