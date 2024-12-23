import { useTranslation } from 'react-i18next';

import { Typography } from '@ui/atoms';
import { NoResultUsersSvg } from '@ui/atoms/Svgs/NoResultUsersSvg';

type PropsType = {
  description?: string;
};
export function BaseMiniTableNoResult({ description }: PropsType) {
  const { t } = useTranslation();
  return (
    <div>
      <NoResultUsersSvg className="m-auto xl:w-[9.375rem] xl:h-[9.375rem] md:w-[6.25rem] md:h-[6.25rem] h-[9.375rem] w-[9.375rem]" />
      <Typography
        variant="body4B"
        color="neutral"
        className="text-center sm:pb-0 pb-2"
      >
        {description ?? t('global.notFoundData')}
      </Typography>
    </div>
  );
}
