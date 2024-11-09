import UsersThree from '@iconify-icons/ph/users-three';
import { useTranslation } from 'react-i18next';
import trashSimple from '@iconify-icons/ph/trash-simple';

import { Avatar, Typography } from '@redesignUi/atoms';
import { CardButton } from '@redesignUi/atoms/Card/CardButton';
import { IconButton } from '@redesignUi/atoms/BaseButton';

import { TitleNumber } from './TitleNumber/TitleNumber';
import { GroupCardProps } from './types';

export function GroupCard(props: GroupCardProps): JSX.Element {
  const {
    onClick,
    disabled,
    className,
    avatarClassName,
    iconClassName,
    groupData,
  } = props;
  const { t } = useTranslation();

  return (
    <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 mb-10 justify-center ">
      {groupData.length >= 1 &&
        groupData.map((group) => (
          <CardButton
            key={group.id}
            border
            borderColor="neutral"
            color="white"
            onClick={() => onClick(group)}
            disabled={disabled}
            rounded="xxl"
            shadow="base"
            className={`p-5 pt-12 w-[100%] sm:w-[287px] md:w-[223px] lg:w-[255px] relative ${className}`}
          >
            <IconButton
              icon={trashSimple}
              color="redNoBg"
              className="absolute top-1 left-1"
            />
            <div className="flex flex-col items-center">
              {!group.image ? (
                <Avatar
                  icon={UsersThree}
                  className={`mb-2.5 ${avatarClassName}`}
                  iconClassName={iconClassName}
                  size="lg"
                />
              ) : (
                <img
                  src={group.image as string}
                  alt=""
                  className="w-16 h-16 rounded-full  border border-gray-300 "
                />
              )}
              <Typography
                variant="body4B"
                color="black"
                className="font-semibold"
              >
                {group.name}
              </Typography>
              <div className="flex flex-row gap-2.5 mt-5">
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
                  number={group.users.length}
                />
              </div>
            </div>
          </CardButton>
        ))}
    </div>
  );
}
