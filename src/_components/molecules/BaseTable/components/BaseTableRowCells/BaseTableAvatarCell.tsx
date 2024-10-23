import { Avatar, Typography } from '@redesignUi/atoms';
import userIcon from '@iconify-icons/ph/user';
import { BaseTableAvatarCellProps, IdItem } from '../../types';

export default function BaseTableAvatarCell<T extends IdItem>(
  props: BaseTableAvatarCellProps<T>
) {
  const { row, id, header } = props;
  const isAvatarType = header.type === 'avatar';
  const isActive = isAvatarType ? row[header?.isActive] : '';
  const email = isAvatarType ? row[header?.email] : '';

  const cellLabel = Array.isArray(id)
    ? id.map((i: string) => `${row[i]} `)
    : row[id];

  const commonStyle =
    'whitespace-nowrap text-ellipsis overflow-hidden hover:whitespace-nowrap hover:overflow-visible transition-transform duration-1000 ease-linear hover:translate-x-[50%] hover:duration-[1000ms]';
  return (
    <div className="flex ">
      <Avatar icon={userIcon} isActive={isActive} size="md" />
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
