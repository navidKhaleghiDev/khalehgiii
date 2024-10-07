import { Avatar, Typography } from '@redesignUi/atoms';
import { CardButton } from '@redesignUi/atoms/Card/CardButton';
import UsersThree from '@iconify-icons/ph/users-three';

import TitleNumber from './TitleNumber/TitleNumber';
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
    title,
    onClick,
    disabled,
    className,
    avatarClassName,
    iconClassName,
    details,
  } = props;
  return (
    <CardButton
      border
      borderColor="neutral"
      color="white"
      onClick={onClick}
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
          size="responsive"
        />
        <Typography
          variant="body4B"
          color="neutralDark"
          className="font-semibold"
        >
          {title}
        </Typography>
        <div className="flex flex-row gap-2.5 mt-5">
          {details &&
            details.map((detail) => (
              <TitleNumber
                title={detail.title}
                number={detail.number}
                key={detail.id}
              />
            ))}
        </div>
      </div>
    </CardButton>
  );
}
