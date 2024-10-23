import { useLanguage } from '@context/settings/languageContext';

import { Typography } from '@redesignUi/atoms/Typography/Typography';
import { BaseTableNoneCellProps, IdItem } from '../../types';

/**
 * Renders a table cell that displays a label for rows without data.
 * It handles both single and multiple identifiers to retrieve the appropriate data from the row.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableNoneCellProps<T>} props - The props object for the `BaseTableNoneCell` component.
 * @param {T} props.row - The data object for the current row, containing the information to be displayed.
 * @param {string | string[]} props.id - The key or keys used to access the data in the row.
 *                                      It can be a single string or an array of strings.
 *
 * @returns {JSX.Element} The rendered table cell containing the label.
 */

export function BaseTableNoneCell<T extends IdItem>(
  props: BaseTableNoneCellProps<T>
) {
  const { row, id, header } = props;
  const { isFarsi } = useLanguage();

  const transitionDirection = !isFarsi ? '[50%]' : '[-50%]';

  const textTransform = header.type === 'none' && header.textTransform;

  const cellLabel = Array.isArray(id)
    ? id.map((i: string) => `${row[i]} `)
    : row[id];

  return (
    <div className="group w-full">
      <div className="relative w-full max-w-[300px] overflow-hidden group">
        <Typography
          variant="body6"
          type="p"
          className={` text-gray-900 dark:text-white whitespace-nowrap text-ellipsis overflow-hidden group-hover:whitespace-nowrap group-hover:overflow-visible transition-transform duration-1000 ease-linear group-hover:translate-x-${transitionDirection} group-hover:duration-[1000ms] font-normal   ${textTransform} `}
        >
          {cellLabel ?? '--'}
        </Typography>
      </div>
    </div>
  );
}
