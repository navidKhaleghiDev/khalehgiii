import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { EPermissionConfig } from '@src/types/permissions';
import { ApplicationSetting } from './ApplicationSetting/Application';

export default function ApplicationSettingCP() {
  const userPermissions = useUserPermission();

  const SettingsConfigP = checkPermission(
    userPermissions,
    EPermissionConfig.VIEW
  );
  return <div>{SettingsConfigP ? <ApplicationSetting /> : null}</div>;
}
