import { ROUTES_PATH } from '@src/routes/routesConstants';
import { BaseButton } from '@ui/atoms/BaseButton';
import { NoResult } from '@ui/molecules/NoResult';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function NotFoundPage() {
  const { t } = useTranslation();
  return (
    <div className="p-16 h-screen flex flex-col justify-center items-center font-on">
      <NoResult description={t('global.notFoundPage')} />
      <Link to={ROUTES_PATH.home}>
        <BaseButton
          className="mt-6"
          label={t('global.goToHome')}
          type="default"
          size="lg"
        />
      </Link>
    </div>
  );
}

export default NotFoundPage;
