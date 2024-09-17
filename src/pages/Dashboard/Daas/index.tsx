import { useEffect, useState } from 'react';
import { Typography } from '@ui/atoms';
import { ProgressBar } from '@ui/molecules/ProgressBar';
import { useTranslation } from 'react-i18next';

type TDassProps = {
  src: string;
};

export function Daas({ src }: TDassProps) {
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return loading ? (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Typography variant="body3">
        {t('dashboard.desktopThePreparation')}
      </Typography>
      <div className="w-1/2">
        <ProgressBar durationInSeconds={5} />
      </div>
    </div>
  ) : (
    <div
      style={{
        height: `${window.innerHeight - 50}px`,
      }}
    >
      <iframe width="100%" height="100%" src={src} title="Desktop As Service" />
    </div>
  );
}
