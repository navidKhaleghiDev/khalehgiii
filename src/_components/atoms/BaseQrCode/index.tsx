import { useState } from 'react';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';

import PhArrowsClockwise from '@iconify-icons/ph/arrows-clockwise';
import { API_USERS_OTP } from '@src/services/users';
import { IconButton } from '@redesignUi/atoms/BaseButton';
import { LoadingSpinner } from '@redesignUi/molecules/Loading';
import { QrBorder } from '@redesignUi/atoms/Svgs/QrBorder';

export default function BaseQrCode({ email, defaultValue }: any) {
  const { t } = useTranslation();
  const [secret, setSecret] = useState<undefined | string>(undefined);
  const [loading, setLoading] = useState(false);

  const handleGenarateQrcode = async () => {
    setLoading(true);
    await API_USERS_OTP(email)
      .then(({ data }) => {
        toast.success(t('global.sucessfulyUpdated'));
        setSecret(data?.secret);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center w-40 h-40 ${
        loading ? 'loading' : ''
      }    `}
    >
      <div className="flex items-center justify-center">
        {!loading ? (
          <div className="relative h-[140px] w-[140px]">
            <QrBorder className="absolute h-[140px] w-[140px]" />
            <QRCode
              value={`otpauth://totp/netsep?secret=${secret || defaultValue}`}
              className=" w-[120px] h-[120px] z-10 absolute right-2.5 top-2.5"
            />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <IconButton
        disabled={loading}
        className="absolute  bottom-2 -right-10 z-50"
        onClick={() => handleGenarateQrcode()}
        size="sm"
        icon={PhArrowsClockwise}
        color="neutral"
      />
    </div>
  );
}
