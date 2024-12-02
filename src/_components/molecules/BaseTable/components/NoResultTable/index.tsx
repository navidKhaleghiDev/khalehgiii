import { useTranslation } from 'react-i18next';

import { NoResultTableSvg } from '@redesignUi/atoms/Svgs/NoResultTableSvg';
import { Typography } from '@redesignUi/atoms';

type NoResultTableProps = {
  isPage?: boolean;
  description?: string;
};

export function NoResultTable({ isPage, description }: NoResultTableProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <NoResultTableSvg height={200} width={200} />
      <Typography variant="body4B" color="neutral" className="text-center">
        {description ?? t('global.notFoundDataInPage')}
      </Typography>
    </div>
  );
}
