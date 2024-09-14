import { ROUTES_PATH } from '@src/routes/routesConstants';
import { BaseButton } from '@ui/atoms/BaseButton';
import { NoResult } from '@ui/molecules/NoResult';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useUserContext } from '@context/user/userContext';
import { useEffect } from 'react';
import { http } from '@src/services/http';

function NotFoundPage() {
  const { t } = useTranslation();
  const { user, setUser } = useUserContext();

  useEffect(() => {
    if (!user?.id) {
      setUser(null);
      http.removeAuthHeader();
    }
  }, [setUser, user]);

  return (
    <div className="p-16 h-screen flex flex-col justify-center items-center font-on">
      <NoResult description={t('global.notFoundPage')} />
      <Link to={user === null ? ROUTES_PATH.home : ROUTES_PATH.dashboard}>
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
