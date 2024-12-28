import { Link } from 'react-router-dom';
import unauthorizedImage from '@src/assets/images/403.jpg';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { BaseButton, Typography } from '@ui/atoms';

export function UnauthorizedComponent() {
  return (
    <>
      <div className="w-1/3">
        <img
          src={unauthorizedImage}
          alt="Unauthorized"
          className="object-contain "
        />
      </div>
      <Typography variant="h3">متاسفم!</Typography>
      <Typography variant="h4">
        شما اجازه دسترسی به این بخش را ندارید!
      </Typography>

      <Link to={ROUTES_PATH.home}>
        <BaseButton className="mt-6" label="برو صفحه اصلی" size="lg" />
      </Link>
    </>
  );
}
function UnauthorizedPage() {
  return (
    <div
      dir="ltr"
      className="font-on p-16 h-screen flex flex-col justify-center items-center"
    >
      <UnauthorizedComponent />
    </div>
  );
}

export default UnauthorizedPage;
