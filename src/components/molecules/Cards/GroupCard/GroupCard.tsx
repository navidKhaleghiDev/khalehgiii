import { useState } from 'react';
import UsersThree from '@iconify-icons/ph/users-three';
import { useTranslation } from 'react-i18next';
import trashSimple from '@iconify-icons/ph/trash-simple';

import { Avatar, Typography } from '@ui/atoms';
import { CardButton } from '@ui/atoms/Card/CardButton';
import { IconButton } from '@ui/atoms/BaseButton';
import {
  checkPermission,
  useUserPermission,
} from '@src/helper/hooks/usePermission';
import { PermissionGroupManagement } from '@src/types/permissions';

import { useLanguage } from '@context/settings/languageContext';
import { TitleNumber } from './TitleNumber/TitleNumber';
import { GroupCardProps } from './types';

export function GroupCard(props: GroupCardProps): JSX.Element {
  const {
    onClick,
    className,
    avatarClassName,
    iconClassName,
    groupData,
    handleRemoveGroup,
  } = props;
  const { t } = useTranslation();
  const userPermissions = useUserPermission();
  const { rtl } = useLanguage();
  const GroupManagementDelete = checkPermission(
    userPermissions,
    PermissionGroupManagement.DELETE
  );

  const [isRemoving, setIsRemoving] = useState(false);

  const handleIconClick = (groupId: string) => {
    setIsRemoving(true);
    handleRemoveGroup(groupId);
    setIsRemoving(false);
  };

  return (
    <div className="flex flex-wrap  gap-6 md:justify-start justify-center mb-2">
      {groupData.length >= 1 &&
        groupData.map((group) => (
          <div
            key={group.id}
            className="relative  h-[14.75rem] w-[16.563rem] md:w-[13.938rem] lg:w-[16.563rem]"
          >
            {GroupManagementDelete ? (
              <IconButton
                icon={trashSimple}
                color="redNoBg"
                className={`absolute top-2 ${rtl ? 'left-2 ' : 'right-2'} `}
                onClick={() => handleIconClick(group?.id as string)}
              />
            ) : null}
            <CardButton
              border
              borderColor="neutral"
              color="white"
              onClick={() => !isRemoving && onClick(group)}
              rounded="xxl"
              shadow="base"
              className={`p-5 h-[14.75rem] w-[16.563rem] md:w-[13.938rem] lg:w-[16.563rem] ${className}`}
            >
              <div className="flex flex-col items-center ">
                {!group.image ? (
                  <Avatar
                    icon={UsersThree}
                    className={`mb-2.5 w-16 h-16  ${avatarClassName}`}
                    iconClassName={iconClassName}
                    size="lg"
                  />
                ) : (
                  <img
                    src={group.image as string}
                    alt=""
                    className="w-16 h-16 mb-2.5 rounded-full border border-gray-300"
                  />
                )}
                <Typography
                  variant="body4B"
                  color="black"
                  className="font-semibold"
                >
                  {group.name}
                </Typography>
                <div className="flex flex-row sm:gap-2.5 gap-1 mt-5">
                  <TitleNumber
                    title={t('groupManagement.admin')}
                    number={group.admins.length}
                  />
                  <TitleNumber
                    title={t('groupManagement.users')}
                    number={group.users.length}
                  />
                  <TitleNumber
                    title={t('groupManagement.onlineUsers')}
                    number={group?.online_users ?? 0}
                  />
                </div>
              </div>
            </CardButton>
          </div>
        ))}
    </div>
  );
}