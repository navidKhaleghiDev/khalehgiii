import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LoadingWrapper } from '@ui/molecules/Loading/LoadingWrapper';
import QRCode from 'react-qr-code';
import { API_USERS_OTP } from '@src/services/users';
import { BaseButton } from '../BaseButton/BaseButton';

export default function BaseQrCode({ email }: any) {
  const { t } = useTranslation();
  const [error, setError] = useState<string | null>(null);
  const [secret, setSecret] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const handleGenarateQrcode = async () => {
    setLoading(true);
    await API_USERS_OTP(email)
      .then(({ data }) => {
        console.log(data?.secret);
        setSecret(data?.secret);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      })
      .finally(() => setLoading(false));
  };

  return (
    <div className="w-full">
      {secret ? (
        <LoadingWrapper isLoading={loading}>
          <div className="flex items-center justify-center w-40 h-40">
            <QRCode
              value={`otpauth://totp/netsep?secret=${secret}`}
              className=" w-36 h-36 "
            />
          </div>
        </LoadingWrapper>
      ) : (
        <BaseButton
          label={t('login.confirm')}
          onClick={() => handleGenarateQrcode()}
          className="mt-20"
          loading={loading}
          size="md"
          fullWidth
        />
      )}
    </div>
  );
}
