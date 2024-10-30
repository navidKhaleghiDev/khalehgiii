import { useUserContext } from '@context/user/userContext';
import { ApplicationSetting } from './ApplicationSetting';

export default function Application() {
  const { user } = useUserContext();

  const userExist = user?.is_meta_admin || user?.is_superuser;
  return (
    <div>
      <ApplicationSetting userExist={userExist} />
    </div>
  );
}
