import { useTranslation } from 'react-i18next';

import { Typography } from '@ui/atoms';
import { NoResultSvg } from '@ui/atoms/Svgs/NoResultSvg';

type NoResultProps = {
  isPage?: boolean;
  description?: string;
};
export function NoResult({ isPage, description }: NoResultProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <NoResultSvg height={200} width={200} />
      <Typography variant="body4B" color="neutral">
        {description ?? t('table.nothingFound')}
      </Typography>
    </div>
  );
}
