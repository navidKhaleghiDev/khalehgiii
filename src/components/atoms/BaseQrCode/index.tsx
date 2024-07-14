import { toast } from 'react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { API_USERS_OTP } from '@src/services/users';
import PhArrowsClockwise from '@iconify-icons/ph/arrows-clockwise';
import { LoadingSpinner } from '@ui/molecules/Loading';
import { IconButton } from '../BaseButton';

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
      className={`flex-col w-40 h-50 relative ${loading ? 'loading' : ''}    `}
    >
      <div className="flex items-center justify-center w-40 h-40">
        {!loading ? (
          <QRCode
            value={`otpauth://totp/netsep?secret=${secret || defaultValue}`}
            className=" w-36 h-36 "
          />
        ) : (
          <LoadingSpinner />
        )}
      </div>
      <IconButton
        disabled={loading}
        className="absolute  bottom-2 -right-7 "
        onClick={() => handleGenarateQrcode()}
        size="xl"
        color="teal"
        icon={PhArrowsClockwise}
      />
    </div>
  );
}
