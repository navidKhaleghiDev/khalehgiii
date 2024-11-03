import { useUserContext } from '@context/user/userContext';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { EPermissionConfig } from '@src/types/permissions';

import { ApplicationSetting } from './ApplicationSetting';

export default function Application() {
  const { user } = useUserContext();
  const userPermissions = useUserPermission();

  const userExist = user?.is_meta_admin || user?.is_superuser;
  const SettingsConfigP = checkPermission(
    userPermissions,
    EPermissionConfig.VIEW
  );
  return (
    <div>
      {SettingsConfigP ? <ApplicationSetting userExist={userExist} /> : null}
    </div>
  );
}
