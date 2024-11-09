import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import cookie from 'js-cookie';

import { LoadingPage } from '@ui/molecules/Loading';
import { withAuth } from '@src/helper/hoc/withAuth';
import { API_USERS_PROFILE } from '@src/services/users';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { useUserContext } from '@context/user/userContext';
import { STORAGE_KEY_TOKEN, http } from '@src/services/http';
import { NavbarDashboard } from '@redesignUi/organisms/Navbar/NavbarDashboard';
import { SideBar } from '@redesignUi/organisms/Sidebar';
import { NavbarUser } from '@redesignUi/organisms/Navbar/NavbarUser/NavbarUser';

function LayoutCp() {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState(true);
  const { user, setUser } = useUserContext();
  const isUser = user?.is_meta_admin || user?.is_superuser;
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
      <div className="flex h-screen bg-gray-50 dark:bg-gray-700 font-kalameh">
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="z-50 border-gray-200 shadow-lg bg-gray-50 dark:bg-gray-700 px-5">
            {isUser ? <NavbarDashboard /> : <NavbarUser />}
          </header>
          <div
            className={`flex sm:flex-row h-full overflow-y-auto ${
              isUser ? 'px-0.5 container mx-auto justify-center mb-5' : ''
            }`}
          >
            {isUser ? (
              <nav className="flex mx-auto sm:h-full z-40">
                <div className="flex items-center justify-center w-full h-full shadow-md sm:w-fit rounded-2xl">
                  <SideBar />
                </div>
              </nav>
            ) : null}

            <main
              className={`flex flex-col w-full overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-gray-700 ${
                isUser ? 'mt-5' : 'mt-0'
              }`}
            >
              <div className="relative flex flex-col w-full h-full gap-16 mx-auto">
                <div className="flex flex-col gap-16 sm:h-full">
                  <div className={`${isUser ? 'px-5' : 'px-0'} sm:h-full`}>
                    <Outlet />
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
  return <LoadingPage description={t('global.pleaseBePatient')} />;
}

export default withAuth(LayoutCp);
