import { Card, Typography } from '@ui/atoms';
import { useTranslation } from 'react-i18next';

export function LicenseTableHeader() {
  const { t } = useTranslation();

  return (
    <Card
      color="tealDark"
      className=" flex h-10 items-center px-2 my-2 w-full text-white"
    >
      <Typography
        variant="body3"
        type="div"
        className="px-3 w-3/12 text-center break-words uppercase"
      >
        {t('license.licenseId')}
      </Typography>
      <Typography
        variant="body3"
        type="div"
        className="px-3 w-3/12 text-center break-words uppercase"
      >
        {t('license.licenseStatus')}
      </Typography>
      <Typography
        variant="body3"
        type="div"
        className="px-3 w-3/12 text-center break-words uppercase"
      >
        {t('license.licenseNumbers')}
      </Typography>

      <Typography
        variant="body3"
        type="div"
        className="px-3 w-3/12 text-center break-words uppercase"
      >
        {t('license.licenseExpirationDate')}
      </Typography>
      <Typography
        variant="body3"
        type="div"
        className="px-3 w-3/12 text-center break-words uppercase"
      >
        {t('license.activeNumbers')}
      </Typography>
      <Typography
        variant="body3"
        type="div"
        className="px-3 w-3/12 text-center break-words uppercase"
      >
        {t('table.moreDetail')}
      </Typography>
    </Card>
  );
}
