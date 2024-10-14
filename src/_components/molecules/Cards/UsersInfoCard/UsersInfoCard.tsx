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
  const { icon, iconColor, title, count } = props;
  return (
    <Card
      border
      borderColor="neutral"
      className="w-[21.87rem] h-20 p-5 flex items-center gap-5 outline-none overflow-hidden"
      color="white"
      rounded="xxl"
      shadow="base"
    >
      <div className={iconStyles({ iconColor })}>
        <BaseIcon icon={icon} size="md" />
      </div>
      <div className="w-full">
        <Typography color="neutralMiddle" variant="body3">
          {title}
        </Typography>
        {count && (
          <Typography
            className="text-gray-900 dark:text-white font-semibold leading-7"
            variant="body2"
          >
            {count}
          </Typography>
        )}
      </div>
    </Card>
  );
}
