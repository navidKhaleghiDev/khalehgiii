import { useTranslation } from 'react-i18next';

import { NoResultUsersSvg } from '@ui/atoms/Svgs/NoResultUsersSvg';
import { Typography } from '@ui/atoms';

type NoResultUsersProps = {
  isPage?: boolean;
  description?: string;
};

export function NoResultUsers({ isPage, description }: NoResultUsersProps) {
  const { t } = useTranslation();

  return (
    <div
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <NoResultUsersSvg height={200} width={200} />
      <Typography variant="body4B" color="neutral" className="text-center">
        {description ?? t('global.noUsersOnline')}
      </Typography>
    </div>
  );
}
