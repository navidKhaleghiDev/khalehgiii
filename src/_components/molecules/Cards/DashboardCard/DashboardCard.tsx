import { IconType } from '@src/types/global';
import { Typography, BaseIcon } from '@redesignUi/atoms';
import { CardButton } from '@redesignUi/atoms/Card/CardButton';

type CardProps = {
  icon: IconType;
  title: string;
  onClick?: () => void;
  count?: number;
  className?: string;
  disabled?: boolean;
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
 * If not provided, the card will be disabled.
 * @param {number} [props.count] - Optional count to be displayed below the title. If not provided, no count will be displayed.
 * @param {boolean} [props.disabled] - If `true`, the card will be disabled regardless of the `onClick` handler.
 *
 * @returns {JSX.Element} Returns the rendered DashboardCard component.
 */
export function DashboardCard(props: CardProps): JSX.Element {
  const { icon, title, onClick, count, className, disabled } = props;
  return (
    <CardButton
      border
      borderColor="neutral"
      className={`max-w-[21.875rem] xl:h-20 h-14 p-5 py-[1.125rem] flex items-center gap-2.5 outline-none text-right overflow-hidden ${className}`}
      color="white"
      onClick={onClick}
      disabled={disabled}
      rounded="xxl"
      shadow="base"
    >
      <div className="bg-gray-100 p-2 rounded-lg shadow-sm dark:bg-gray-700">
        <BaseIcon
          icon={icon}
          size="md"
          className="text-gray-500 dark:text-gray-400"
        />
      </div>
      <div className="w-full rtl:text-right ltr:text-left">
        <Typography
          color="neutralMiddle"
          variant="body3"
          className="xl:text-lg sm:text-sm text-xs"
        >
          {title}
        </Typography>
        <Typography
          className="text-gray-900 dark:text-white font-semibold xl:text-xl sm:text-sm text-xs"
          variant="body2"
        >
          {count ?? 0}
        </Typography>
      </div>
    </CardButton>
  );
}
