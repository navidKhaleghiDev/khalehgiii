import { toast } from 'react-toastify';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import { API_USERS_OTP } from '@src/services/users';
import { BaseButton } from '../BaseButton/BaseButton';

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
    <div className="flex-col w-40 h-50">
      <div className="flex items-center justify-center w-40 h-40">
        <QRCode
          value={`otpauth://totp/netsep?secret=${secret || defaultValue}`}
          className=" w-36 h-36 "
        />
      </div>
      <BaseButton
        label={t('global.genrateQrcode')}
        onClick={() => handleGenarateQrcode()}
        loading={loading}
        size="md"
        fullWidth
      />
    </div>
  );
}
