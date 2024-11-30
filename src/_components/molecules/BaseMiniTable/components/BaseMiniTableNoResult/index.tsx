import { useTranslation } from 'react-i18next';

import { Typography } from '@redesignUi/atoms';
import { NoResultUsersSvg } from '@redesignUi/atoms/Svgs/NoResultUsersSvg';

type PropsType = {
  description?: string;
};
export function BaseMiniTableNoResult({ description }: PropsType) {
  const { t } = useTranslation();
  return (
    <div>
      <NoResultUsersSvg className="m-auto xl:w-[150px] xl:h-[150px] md:w-[100px] md:h-[100px] h-[150px] w-[150px]" />
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
