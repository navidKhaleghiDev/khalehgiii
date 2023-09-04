import { ROUTES_PATH } from '@src/routes/routesConstants';
import { BaseButton } from '@ui/atoms/BaseButton';
import { NoResult } from '@ui/molecules/NoResult';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <div className="p-16 h-screen flex flex-col justify-center items-center font-on">
      <NoResult description="صفحه مورد نظر یافت نشد!" />
      <Link to={ROUTES_PATH.home}>
        <BaseButton
          className="mt-6"
          label="برو به خانه"
          type="default"
          size="lg"
        />
      </Link>
    </div>
  );
}

export default NotFoundPage;
