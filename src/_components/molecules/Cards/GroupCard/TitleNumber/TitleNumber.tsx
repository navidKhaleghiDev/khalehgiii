import { Typography } from '@redesignUi/atoms';

import { Detail } from '../types';

/**
 * TitleNumber Component
 *
 * A simple component that displays a title and a number in a vertical layout.
 * The component is designed to display text and numeric values in a concise format.
 *
 * @component
 *
 * @param {Object} props - The props for the TitleNumber component.
 * @param {string} props.title - The title to be displayed.
 * @param {number} props.number - The number to be displayed below the title.
 *
 * @returns {JSX.Element} Returns the rendered TitleNumber component.
 */

export default function TitleNumber({
  title,
  number,
}: Omit<Detail, 'id'>): JSX.Element {
  return (
    <div className="flex flex-col min-w-16">
      <Typography
        variant="body6"
        color="neutralMiddle"
        className="whitespace-nowrap mb-2.5"
      >
        {title}
      </Typography>
      <Typography variant="body5B" color="neutralDark">
        {number}
      </Typography>
    </div>
  );
}
