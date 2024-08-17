import { ROUTES_PATH } from '@src/routes/routesConstants';
import { BaseButton } from '@ui/atoms/BaseButton';
import { NoResult } from '@ui/molecules/NoResult';
// import { Link, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import { useEffect } from 'react';
// import { useUserContext } from '@context/user/userContext';

function NotFoundPage() {
  // const navigate = useNavigate();
  const { t } = useTranslation();
  // const { user } = useUserContext();

  // useEffect(() => {
  //   if (user === null) {
  //     navigate(ROUTES_PATH.login);
  //   } else navigate(ROUTES_PATH.dashboard);
  // }, [user, navigate]);

  return (
    <div className="p-16 h-screen flex flex-col justify-center items-center font-on">
      <NoResult description={t('global.notFoundPage')} />
      <Link to={ROUTES_PATH.dashboard}>
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
