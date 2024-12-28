import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { BaseButton, Typography } from '@ui/atoms';
import { NotFoundSvg } from '@ui/atoms/Svgs/NotFoundSvg';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { useTheme } from '@context/settings/themeContext';

export function NotFoundPage() {
  const { isDark, toggleTheme } = useTheme();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleToggle = () => (isDark ? toggleTheme() : null);

  const handleClick = () => {
    handleToggle();
    navigate(ROUTES_PATH.home);
  };

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

      <BaseButton
        className="mt-[3.563rem]"
        label={t('global.goToSystem')}
        onClick={handleClick}
        type="teal"
        size="md"
      />
    </div>
  );
}
