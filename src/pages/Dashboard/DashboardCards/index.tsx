import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import keyIcon from '@iconify-icons/ph/key';
import desktopIcon from '@iconify-icons/ph/desktop';
import usersThreeIcon from '@iconify-icons/ph/users-three';
import { useUserContext } from '@context/user/userContext';
import shieldCheckIcon from '@iconify-icons/ph/shield-check';
import PhGlobeHemisphereWest from '@iconify-icons/ph/globe-hemisphere-west';
import { ROUTES_PATH } from '@src/routes/routesConstants';

import { Card } from './Card';

export function DashboardCards() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const { t } = useTranslation();

  return (
    <div className="grid w-full grid-cols-12 gap-16 mb-16">
      {user?.is_meta_admin && (
        <div className="col-span-10 md:col-span-6 xl:col-span-3">
          <Card
            icon={usersThreeIcon}
            title={t('dashboard.adminLists')}
            description=""
            onClick={() => navigate(ROUTES_PATH.dashboardAdminsList)}
          />
        </div>
      )}
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={desktopIcon}
          title={t('dashboard.desktopLists')}
          description=""
          onClick={() => navigate(ROUTES_PATH.dashboardDesktopList)}
        />
      </div>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={keyIcon}
          title={`${t('dashboard.adminPanel')} keycloak`}
          description=""
          onClick={() => {
            window.open(import.meta.env.VITE_KEY_CLOAK_ADMIN_PANEL, '_blank');
          }}
        />
      </div>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={shieldCheckIcon}
          title={t('dashboard.fileScanReports')}
          description=""
          onClick={() => navigate(ROUTES_PATH.monitoring)}
        />
      </div>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={shieldCheckIcon}
          title={t('dashboard.extensionList')}
          description=""
          onClick={() => navigate(ROUTES_PATH.extensionList)}
        />
      </div>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={shieldCheckIcon}
          title="UBA"
          description=""
          onClick={() => navigate(ROUTES_PATH.uba)}
        />
      </div>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={shieldCheckIcon}
          title={t('global.reports')}
          description=""
          onClick={() => navigate(ROUTES_PATH.reports)}
        />
      </div>
      <div className="col-span-10 md:col-span-6 xl:col-span-3">
        <Card
          icon={PhGlobeHemisphereWest}
          title={t('global.internetLog')}
          description=""
          onClick={() => navigate(ROUTES_PATH.internetLog)}
        />
      </div>
    </div>
  );
}
