import { Typography, BaseIcon } from '@redesignUi/atoms';
import { CardButton } from '@redesignUi/atoms/Card/CardButton';

import { LoginCardProps } from './types';

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

export function LoginCard(props: LoginCardProps): JSX.Element {
  const { icon, title, onClick, subject, disabled } = props;
  return (
    <CardButton
      border
      borderColor="teal"
      className="w-full h-[4.5rem] sm:h-[10.5rem] p-5 flex sm:flex-col items-center gap-2.5 outline-none text-right overflow-hidden disabled:opacity-40 group"
      color="white"
      onClick={onClick}
      disabled={disabled}
      rounded="xxl"
      shadow="base"
    >
      <div className="bg-gray-200 border-8 border-gray-100 p-2 rounded-full text-gray-500 dark:bg-gray-700 dark:text-gray-400 group-active:bg-teal-200 group-active:border-teal-100 group-active:text-teal-500">
        <BaseIcon icon={icon} size="md" />
      </div>
      <div className="w-full text-center">
        <Typography color="black" variant="body5B" className="leading-5">
          {subject}
        </Typography>
        <Typography className="leading-6" variant="body6" color="neutralMiddle">
          {title}
        </Typography>
      </div>
    </CardButton>
  );
}
