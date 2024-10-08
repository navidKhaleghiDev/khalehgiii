import React, { useEffect } from 'react';
// import { NavbarDashboard } from '@ui/organisms/Navbar/NavbarDashboard';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoadingPage } from '@ui/molecules/Loading';
import cookie from 'js-cookie';

import { withAuth } from '@src/helper/hoc/withAuth';
import { API_USERS_PROFILE } from '@src/services/users';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { useUserContext } from '@context/user/userContext';
import { STORAGE_KEY_TOKEN, http } from '@src/services/http';
import { useTranslation } from 'react-i18next';
import { NavbarDashboard } from '@redesignUi/organisms/Navbar/NavbarDashboard';

function LayoutCp() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const { user, setUser } = useUserContext();

  const navigate = useNavigate();

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true);
      await API_USERS_PROFILE()
        .then(({ data }) => {
          if (data.exceeded_usage) {
            navigate(ROUTES_PATH.unauthorized);
            return;
          }
          setUser(data);
        })
        .catch(() => {
          http.removeAuthHeader();
          navigate(ROUTES_PATH.login);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    const token = cookie.get(STORAGE_KEY_TOKEN);
    if (!user && token) {
      getProfile();
    } else {
      setLoading(false);
    }
  }, [navigate, setUser, user]);

  if (!loading) {
    return (
      <div className="font-on w-full min-h-screen flex flex-col justify-center items-center 2xl:mx-auto overflow-y-hidden ">
        <div className="w-full h-16 bg-white dark:bg-gray-700 fixed top-0 z-10 shadow-md">
          <NavbarDashboard />
        </div>
        <div className="w-full h-full grid grid-cols-12 gap-1 flex-1 mt-12 ">
          <div className="bg-white w-full col-span-12 overflow-y-auto dark:bg-slate-900">
            <Outlet />
          </div>
        </div>
      </div>
    );
  }
  return <LoadingPage description={t('global.pleaseBePatient')} />;
}

export default withAuth(LayoutCp);
