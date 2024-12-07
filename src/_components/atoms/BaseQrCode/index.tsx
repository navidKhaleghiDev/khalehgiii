import QRCode from 'react-qr-code';

import { LoadingSpinner } from '@redesignUi/molecules/Loading';
import { QrBorder } from '@redesignUi/atoms/Svgs/QrBorder';

interface BaseQrCodeProps {
  secret?: string;
  loading: boolean;
}

export function BaseQrCode({ secret, loading }: BaseQrCodeProps) {
  return (
    <div className="md:relative flex flex-col gap-2 items-center justify-center lg:w-40 lg:h-40 w-[7.5rem]">
      <div className="flex items-center justify-center">
        {!loading ? (
          <div className="relative sm:h-[8.75rem] sm:w-[8.75rem] h-20 w-20">
            <QrBorder className="absolute sm:h-[8.75rem] sm:w-[8.75rem] h-20 w-20" />
            <QRCode
              value={`otpauth://totp/netsep?secret=${secret}`}
              className=" sm:w-[7.5rem] sm:h-[7.5rem] w-[3.75rem] h-[3.75rem] z-10 absolute right-2.5 top-2.5"
            />
          </div>
        ) : (
          <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
