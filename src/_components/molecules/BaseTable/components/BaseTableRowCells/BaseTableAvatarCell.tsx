import { Avatar, Typography } from '@redesignUi/atoms';
import userIcon from '@iconify-icons/ph/user';
import { useLanguage } from '@context/settings/languageContext';

import { BaseTableAvatarCellProps, IdItem } from '../../types';

/**
 * Renders a table cell displaying an avatar and associated user information.
 *
 * @template T - The type of the row item extending from `IdItem`.
 *
 * @param {BaseTableAvatarCellProps<T>} props - The props object for the `BaseTableAvatarCell` component.
 * @param {T} props.row - The data object for the current row containing user information.
 * @param {string | string[]} props.id - The key(s) in the row data that correspond to the user's display label.
 * @param {Object} props.header - The header configuration for the table.
 * @param {string} props.header.type - The type of the header, which determines if the row should render an avatar.
 * @param {string} [props.header.isActive] - The key in the row data indicating if the user is active.
 * @param {string} [props.header.email] - The key in the row data for the user's email.
 *
 * @returns {JSX.Element} A `div` containing an `Avatar` component and two `Typography` elements displaying the user's name and email.
 */

export default function BaseTableAvatarCell<T extends IdItem>(
  props: BaseTableAvatarCellProps<T>
) {
  const { row, id, header } = props;
  const { isFarsi } = useLanguage();

  const transitionDir = !isFarsi ? '-' : '';

  const isAvatarType = header.type === 'avatar';
  const isActive = isAvatarType ? row[header?.isActive] : '';
  const email = isAvatarType ? row[header?.email] : '';

  const cellLabel = Array.isArray(id)
    ? id.map((i: string) => `${row[i]} `)
    : row[id];

  const commonStyle = `whitespace-nowrap text-ellipsis overflow-hidden hover:whitespace-nowrap hover:overflow-visible transition-transform duration-1000 ease-linear hover:${transitionDir}translate-x-[50%] hover:duration-[1000ms]`;
  return (
    <div className="flex ">
      <Avatar icon={userIcon} isActive={isActive} size="table" />
      <div className=" flex flex-col mt-1 justify-center mx-2  relative w-full max-w-[100px] overflow-hidden ">
        <Typography
          variant="body6"
          className={`${commonStyle} text-gray-900 dark:text-white`}
        >
          {cellLabel ?? '--'}
        </Typography>
        <Typography
          variant="body6"
          className={`${commonStyle} text-gray-400 dark:text-gray-300`}
        >
          {email ?? '--'}
        </Typography>
      </div>
    </div>
  );
}