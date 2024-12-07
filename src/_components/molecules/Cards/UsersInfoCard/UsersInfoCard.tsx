import { CardButton } from '@redesignUi/atoms/Card/CardButton';
import { BaseIcon, Typography } from '@redesignUi/atoms';

import { iconStyles } from './styles';
import { UsersInfoCardProps } from './types';

/**
 * UsersInfoCard Component
 *
 * A card component designed to display user-related information, including an icon, a title, and an optional count.
 * The card is customizable with various styles for the icon color and layout.
 *
 * @component
 * @param {Object} props - The props for the UsersInfoCard component.
 * @param {IconType} props.icon - The icon to be displayed in the card.
 * @param {BaseIconProps['color']} props.iconColor - The color of the icon, used to style both the icon and the background.
 * @param {string} props.title - The title text displayed in the card.
 * @param {number} [props.count] - Optional count to be displayed below the title.
 *
 * @returns {JSX.Element} Returns the rendered UsersInfoCard component.
 */

export function UsersInfoCard(props: UsersInfoCardProps): JSX.Element {
  const { icon, iconColor, title, count, className, onClick } = props;
  return (
    <CardButton
      border
      borderColor="neutral"
      className={`lg:h-20 h-[3.75rem] p-3 sm:p-4 md:p-5 flex items-center gap-5 outline-none overflow-hidden ${
        onClick
          ? 'w-fit sm:w-full'
          : 'w-full hover:border-transparent active:border-transparent cursor-default dark:border-none'
      } ${className}`}
      color="white"
      rounded="xxl"
      shadow="base"
      onClick={onClick}
    >
      <div className="w-full flex items-center justify-center gap-5">
        <div
          className={`${iconStyles({ iconColor })} ${
            onClick ? 'self-center' : ''
          }`}
        >
          <BaseIcon icon={icon} size="md" />
        </div>
        <div
          className={`w-full ${onClick !== undefined ? 'hidden sm:block' : ''}`}
        >
          <Typography
            color="neutralMiddle"
            className="lg:text-lg text-xs whitespace-nowrap text-start"
          >
            {title}
          </Typography>

          <Typography className="text-gray-900 dark:text-white font-semibold leading-7 text-base sm:text-lg md:text-xl text-start">
            {count ?? '-'}
          </Typography>
        </div>
      </div>
    </CardButton>
  );
}
