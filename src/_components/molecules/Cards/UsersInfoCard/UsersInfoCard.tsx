import { BaseIcon, Card, Typography } from '@redesignUi/atoms';

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
  const { icon, iconColor, title, count, className, isLoading } = props;

  return !isLoading ? (
    <Card
      border
      borderColor="neutral"
      className={`w-full lg:h-20 h-[3.75rem] p-3 sm:p-4 md:p-5 flex items-center gap-5 outline-none overflow-hidden ${className}`}
      color="white"
      rounded="xxl"
      shadow="base"
    >
      <div className={iconStyles({ iconColor })}>
        <BaseIcon icon={icon} size="md" />
      </div>
      <div className="w-full">
        <Typography
          color="neutralMiddle"
          className="lg:text-lg text-xs whitespace-nowrap"
        >
          {title}
        </Typography>

        <Typography className="text-gray-900 dark:text-white font-semibold leading-7 text-base sm:text-lg md:text-xl">
          {count ?? 0}
        </Typography>
      </div>
    </Card>
  ) : (
    <div className="animate-pulse">
      <div className="lg:h-20 h-[3.75rem] rounded-md w-[160px] sm:w-[250px] md:w-[350px] bg-gray-300" />
    </div>
  );
}
