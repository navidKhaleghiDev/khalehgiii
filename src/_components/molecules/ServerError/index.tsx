import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { ServerErrorSvg } from '@redesignUi/atoms/Svgs/ServerErrorSvg';

type NoResultProps = {
  isPage?: boolean;
  description?: string;
  width: number;
  height: number;
};
export function ServerError({
  description,
  isPage,
  width,
  height,
}: NoResultProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <ServerErrorSvg height={width} width={height} />
      <Typography variant="body4B" color="neutral">
        {description ?? t('table.nothingFound')}
      </Typography>
    </div>
  );
}
