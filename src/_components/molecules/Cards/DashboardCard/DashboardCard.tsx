import { IconType } from '@src/types/global';
import { Typography, BaseIcon } from '@redesignUi/atoms';
import { CardButton } from '@ui/atoms/Card/CardButton';

type CardProps = {
  icon: IconType;
  title: string;
  onClick?: () => void;
  count?: number;
};

/**
 * DashboardCard Component
 *
 * A card component designed for a dashboard layout that displays an icon, a title, and an optional count.
 * The card can be clickable if an `onClick` handler is provided. Otherwise, it is disabled.
 *
 * @component
 *
 * @param {Object} props - The props for the DashboardCard component.
 * @param {IconType} props.icon - The icon to be displayed inside the card.
 * @param {string} props.title - The title text displayed in the card.
 * @param {Function} [props.onClick] - Optional callback function to handle the click event on the card.
 * @param {number} [props.count] - Optional count to be displayed below the title.
 *
 * @returns {JSX.Element} Returns the rendered DashboardCard component.
 */
export function DashboardCard(props: CardProps): JSX.Element {
  const { icon, title, onClick, count } = props;
  return (
    <CardButton
      border
      borderColor="neutral"
      className="w-full h-20 px-5 py-4 flex items-center gap-2.5 outline-none text-right overflow-hidden"
      color="white"
      onClick={onClick}
      disabled={!onClick}
      rounded="xxl"
      shadow="sm"
    >
      <div className="bg-gray-100 p-2 rounded dark:bg-gray-700">
        <BaseIcon
          icon={icon}
          color="neutral"
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
    </CardButton>
  );
}
