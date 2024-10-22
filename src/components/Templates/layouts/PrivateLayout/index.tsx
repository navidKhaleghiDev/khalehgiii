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
import { SideBar } from '@redesignUi/organisms/Sidebar/Sidebar';
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
      <div className="flex h-screen bg-white dark:bg-gray-700 font-kalameh">
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="z-50 border-neutral-200 shadow-lg">
            <NavbarDashboard />
          </header>
          <div className="flex sm:flex-row h-full overflow-y-auto px-0.5 container mx-auto justify-center my-5">
            <nav className="flex mx-auto sm:h-full z-40">
              <div className="flex items-center justify-center w-full h-full shadow-md sm:w-fit rounded-2xl">
                <SideBar />
              </div>
            </nav>
            <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-700 mb-9">
              <div className="relative flex flex-col w-full h-full gap-16 mx-auto">
                <div className="flex flex-col gap-16 sm:h-full">
                  <div className="pt-5 sm:pt-[3.12rem] px-3 sm:px-8 sm:h-full">
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
