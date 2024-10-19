import { Typography } from '@redesignUi/atoms';
import { DoughnutChart } from '@redesignUi/atoms/DoughnutChart';
import { CardButton } from '@redesignUi/atoms/Card/CardButton';

import { DateTitle } from './DateTitle';
import { LicenseCardProps } from './types';

/**
 * The LicenseCard component displays a card with a title, date, and a doughnut chart.
 * It supports customizable styles, click events
 *
 * @component
 *
 * @param {Object} props - The properties for the LicenseCard component.
 * @param {string} props.title - The main title displayed on the card.
 * @param {string} props.date - The date displayed on the card.
 * @param {number} props.subValue - The current value for the doughnut chart (e.g., completed part).
 * @param {number} props.totalValue - The total value for the doughnut chart (e.g., total capacity).
 * @param {() => void} [props.onClick] - Click handler function for when the card is clicked.
 * @param {string} [props.color] - The color for the doughnut chart and date text.
 *
 * @returns {JSX.Element} The LicenseCard component.
 */

export function LicenseCard(props: LicenseCardProps): JSX.Element {
  const { subValue, totalValue, onClick, color, title, date, className } =
    props;
  return (
    <CardButton
      border
      borderColor="neutralLight"
      className={`w-full max-w-[15.87rem] sm:h-28 h-[5.62rem] p-5 flex items-center outline-none text-right overflow-hidden ${
        className ?? ''
      }`}
      color="neutralDark"
      onClick={onClick}
      shadow="base"
      rounded="xxl"
    >
      <div className="w-full flex items-center lg:gap-5 gap[0.62rem] flex-row-reverse">
        <div className="flex flex-col items-start lg:gap-2  w-2/3 box-border">
          <Typography variant="body6B" color="black">
            {title}
          </Typography>
          <DateTitle color={color} date={date} />
        </div>
        <div className="lg:w-1/3">
          <DoughnutChart
            subValue={subValue}
            totalValue={totalValue}
            color={color}
            type="license"
          >
            {`${subValue}/${totalValue}`}
          </DoughnutChart>
        </div>
      </div>
    </CardButton>
  );
}
