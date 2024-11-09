import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { BaseButton, Typography } from '@redesignUi/atoms';
import { NotFoundSvg } from '@redesignUi/atoms/Svgs/NotFoundSvg';
import { ROUTES_PATH } from '@src/routes/routesConstants';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <div className="h-screen dark:bg-gray-700 bg-gray-50 flex flex-col justify-center items-center font-kalameh">
      <NotFoundSvg />

      <Typography
        color="black"
        variant="h4"
        className="mt-[9.625rem] font-semibold"
      >
        {t('global.notFoundPage')}
      </Typography>

      <Link to={ROUTES_PATH.home}>
        <BaseButton
          className="mt-[3.563rem]"
          label={t('global.goToSystem')}
          type="teal"
          size="md"
        />
      </Link>
    </div>
  );
}
