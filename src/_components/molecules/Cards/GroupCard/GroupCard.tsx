import UsersThree from '@iconify-icons/ph/users-three';
import { useTranslation } from 'react-i18next';

import { Avatar, Typography } from '@redesignUi/atoms';
import { CardButton } from '@redesignUi/atoms/Card/CardButton';

import { TitleNumber } from './TitleNumber/TitleNumber';
import { GroupCardProps } from './types';

/**
 * GroupCard Component
 *
 * A card component that displays a title, an avatar icon, and a list of details.
 * The component uses a button card layout and supports disabled and clickable states.
 *
 * @component
 *
 * @param {Object} props - The props for the GroupCard component.
 * @param {string} props.title - The title text displayed in the card.
 * @param {Function} props.onClick - Callback function to handle the click event on the card.
 * @param {boolean} [props.disabled] - Whether the card is disabled or not.
 * @param {string} [props.className] - Additional custom className for styling the outer card.
 * @param {string} [props.avatarClassName] - Additional custom className for styling the avatar.
 * @param {string} [props.iconClassName] - Additional custom className for styling the icon inside the avatar.
 * @param {Array<Object>} [props.details] - List of details to be displayed in the card, each containing a title and a number.
 * @param {string} props.details[].id - The unique identifier for each detail.
 * @param {string} props.details[].title - The title for each detail.
 * @param {number} props.details[].number - The number associated with each detail.
 *
 * @returns {JSX.Element} Returns the rendered GroupCard component.
 */

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
    <div className="flex justify-between ">
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
            className={`w-min p-5 pt-12 ${className}`}
          >
            <div className="flex flex-col items-center">
              <Avatar
                icon={UsersThree}
                className={`mb-2.5 ${avatarClassName}`}
                iconClassName={iconClassName}
                size="lg"
              />
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
