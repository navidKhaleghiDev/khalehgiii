// import { dateAndNumber, dayLabel } from '@src/helper/utils/dateUtils';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
// import calendarCheckIcon from '@iconify-icons/ph/calendar-check';
import keyIcon from '@iconify-icons/ph/key';
import desktopIcon from '@iconify-icons/ph/desktop';
import usersThreeIcon from '@iconify-icons/ph/users-three';
import { useUserContext } from '@context/user/userContext';
import shieldCheckIcon from '@iconify-icons/ph/shield-check';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { useForm } from 'react-hook-form';

// import { CardScanStats } from './CardScanStats';
import { BaseUploadInput } from '@ui/atoms/Inputs/BaseUploadInput';
import { Card } from './Card';
import { Typography } from '@ui/atoms';

let error: any;

export function DashboardCards() {
  const navigate = useNavigate();
  const { user } = useUserContext();
  const [hasError, setHasError] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    setError,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      image: '',
    },
  });
  // console.log(watch('image'));

  const ref = useRef();

  const validateFileSize = (file) => {
    if (file.size > 3 * 1024 * 1024) {
      // 3MB in bytes
      error = setError('image', {
        type: 'manual',
        message: 'The image file shouldent be more than 3MB ',
      });
      return true;
    }
    return false;
  };

  const handleGetImageData = (file) => {
    const uploadLimit = validateFileSize(file);
    if (uploadLimit) setHasError(true);
  };

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
        <BaseUploadInput
          name="image"
          control={control}
          type="add"
          setError={error}
          error={hasError}
          onClick={handleGetImageData}
        />
        {hasError && (
          <Typography variant="h5" className="text-red-500">
            {errors.image?.message}
          </Typography>
        )}
      </div>
    </div>
  );
}
