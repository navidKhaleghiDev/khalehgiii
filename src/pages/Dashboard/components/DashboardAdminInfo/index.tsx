import { checkPermission } from '@src/helper/hooks/usePermission';
import {
  EPermissionMalwareConfig,
  EPermissionUsers,
  PermissionsCodeName,
} from '@src/types/permissions';

import { ServiceInfo } from './ServiceInfo';
import { UserInfo } from '../UserInfo';

export function DashboardAdminInfo({
  permissions,
}: {
  permissions: PermissionsCodeName[];
}): JSX.Element {
  const viewMalwarePermission = checkPermission(
    permissions,
    EPermissionMalwareConfig.VIEW
  );
  const viewUsersPermission = checkPermission(
    permissions,
    EPermissionUsers.VIEW
  );

  if (viewMalwarePermission && viewUsersPermission) {
    return (
      <div className="md:col-span-3 col-span-6 order-1">
        <div className="flex flex-col gap-5">
          <UserInfo
            curveTopSvgClassName="hidden"
            curveBottomSvgClassName="hidden"
            userInfoClassName="pt-2.5 xl:block hidden rtl:scale-x-[1] ltr:scale-x-[-1] absolute mx-auto bottom-5 rtl:left-2 ltr:right-2"
            className="py-1.5 px-5 hidden xl:pb-[1.875rem] md:flex xl:p-5 xl:h-[8.125rem] md:h-12 justify-between relative"
          />
          <ServiceInfo className="!w-full" />
        </div>
      </div>
    );
  }
  if (viewMalwarePermission && !viewUsersPermission) {
    return (
      <div className="md:col-span-8 col-span-6 order-1">
        <div className="flex flex-col gap-5">
          <UserInfo
            curveTopSvgClassName="absolute top-0 rtl:left-0 ltr:right-0 rtl:scale-x-[1] ltr:scale-x-[-1] xl:block hidden z-0"
            curveBottomSvgClassName="absolute bottom-0 rtl:left-0 ltr:right-0 rtl:scale-x-[1] ltr:scale-x-[-1] xl:block hidden z-0"
            userInfoClassName="pt-2.5 absolute bottom-5 rtl:left-5 ltr:right-5 rtl:scale-x-[1] ltr:scale-x-[-1] xl:w-[7.313rem] xl:h-[5.688rem] md:block hidden z-10"
            className="py-1.5 px-5 hidden xl:pb-[3.375rem] md:block xl:p-5 xl:!h-[8.125rem] md:!h-[5.875rem] relative"
          />
          <ServiceInfo className="!w-full xl:!h-[8.125rem] md:!h-[5.875rem] md:[&>*:first-child]:flex-row md:[&>*:first-child>*:first-child]:flex-col" />
        </div>
      </div>
    );
  }
  if (!viewMalwarePermission && viewUsersPermission) {
    return (
      <div className="md:col-span-3 col-span-6 order-1">
        <UserInfo
          curveTopSvgClassName="hidden"
          userInfoClassName="absolute bottom-6 rtl:left-5 ltr:right-5 rtl:scale-x-[1] ltr:scale-x-[-1] xl:w-[9.375rem] xl:h-[7.313rem] z-10"
          curveBottomSvgClassName="absolute bottom-0 rtl:left-0 ltr:right-0 rtl:scale-x-[1] ltr:scale-x-[-1] z-0 xl:w-64 xl:h-[4.688rem] w-[11.875rem] h-auto hidden lg:block"
          className="py-1.5 px-5 xl:pb-[3.375rem] xl:p-5 xl:!h-[17.5rem] md:!h-52 !h-[8.25rem] relative"
        />
      </div>
    );
  }
  return (
    <div className="md:col-span-8 col-span-6 order-1">
      <UserInfo
        className="py-1.5 px-5 xl:pb-[3.375rem] xl:p-5 xl:h-[17.5rem] md:h-52 h-[8.25rem] relative"
        curveTopSvgClassName="hidden"
        userInfoClassName="md:w-[11.375rem] h-auto absolute bottom-5 rtl:left-8 ltr:right-8 rtl:scale-x-[1] ltr:scale-x-[-1] z-20"
        curveBottomSvgClassName="lg:w-[34.75rem] md:w-80 h-auto sm:block hidden absolute bottom-0 rtl:left-0 ltr:right-0 rtl:scale-x-[1] ltr:scale-x-[-1] z-10"
      />
    </div>
  );
}
