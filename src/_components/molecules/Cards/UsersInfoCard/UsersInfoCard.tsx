import { BaseIcon, Card, Typography } from '@redesignUi/atoms';
import { BaseIconProps } from '@redesignUi/atoms/BaseIcon';
import { IconType } from '@src/types/global';

type UsersInfoCardProps = {
  icon: IconType;
  iconColor: BaseIconProps['color'];
  title: string;
  count?: number;
};

/**
 * UsersInfoCard Component
 *
 * A card component designed to display user-related information, including an icon, a title, and an optional count.
 * The card is customizable with various styles for the icon color and layout.
 *
 * @component
 *
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
      className="w-full h-20 px-5 py-4 flex items-center gap-5 outline-none text-right overflow-hidden"
      color="white"
      rounded="xxl"
      shadow="sm"
    >
      <div className={`bg-${iconColor}-100 p-2 rounded dark:bg-gray-700`}>
        <BaseIcon
          icon={icon}
          color={iconColor}
          size="md"
          className="dark:text-gray-400"
        />
      </div>
      <div className="w-full rtl:text-right ltr:text-left">
        <Typography color="neutralMiddle" variant="body3" className="leading-7">
          {title}
        </Typography>
        <Typography
          className="text-gray-900 dark:text-white font-semibold leading-7"
          variant="body2"
        >
          {count}
        </Typography>
      </div>
    </Card>
  );
}
