import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { LoadingPage } from '@ui/molecules/Loading';
import cookie from 'js-cookie';

import { withAuth } from '@src/helper/hoc/withAuth';
import { API_USERS_PROFILE } from '@src/services/users';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { useUserContext } from '@context/user/userContext';
import { STORAGE_KEY_TOKEN, http } from '@src/services/http';
import { useTranslation } from 'react-i18next';
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
      // <div className="font-kalameh w-full min-h-screen bg-gray-200 flex flex-col justify-center items-center 2xl:mx-auto overflow-y-hidden ">
      //   <div className="w-full bg-black flex flex-col justify-center items-center fixed top-0 z-10 dark:bg-slate-800 ">
      //     <NavbarDashboard />
      //   </div>
      //   <div className="w-full h-full grid grid-cols-12 gap-1 flex-1 mt-12 ">
      //     <div className="bg-white w-full col-span-12 overflow-y-auto dark:bg-slate-900">
      //       <Outlet />
      //     </div>
      //   </div>
      // </div>
      <div className="flex h-screen bg-white dark:bg-gray-700 font-kalameh">
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="z-50 border-neutral-200 shadow-lg">
            <NavbarDashboard />
          </header>
          <div className="flex sm:flex-row h-full overflow-y-auto px-0.5 container mx-auto justify-center mt-1">
            <nav className="flex mx-auto sm:h-full">
              <div className="flex items-center justify-center w-full h-full shadow-md z-10 sm:w-fit rounded-2xl">
                <SideBar />
              </div>
            </nav>
            <main className="flex flex-col w-full overflow-x-hidden overflow-y-auto bg-white dark:bg-gray-700 mb-9">
              <div className="relative flex flex-col w-full h-full gap-16 mx-auto">
                <div className="flex flex-col gap-16 sm:h-full">
                  <div className="pt-5 sm:pt-[3.12rem] px-3 sm:px-8 sm:h-full">
                    <Outlet />
                  </div>
                  {/* <MenuMobile /> */}
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
