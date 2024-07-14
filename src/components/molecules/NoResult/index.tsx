import { Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

type PropsType = {
  isPage?: boolean;
  description?: string;
};
export function NoResult({ isPage, description }: PropsType) {
  const { t } = useTranslation();
  return (
    <div
      className={`py-8 flex flex-col justify-center items-center ${
        isPage && 'min-h-full'
      }`}
    >
      <img src="/not-found.jpg" alt="not found" />
      <Typography color="neutral">
        {description ?? t('table.nothingFound')}
      </Typography>
    </div>
  );
}
