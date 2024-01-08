import { Card, Typography } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';
import trashIcon from '@iconify-icons/ph/trash';
import { StringifyProperties } from '@src/types/global';
import notePencilIcon from '@iconify-icons/ph/note-pencil';

import { OnClickActionsType } from './types';
import { booleanIcon } from '../utils';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { IUser } from '@src/services/users/types';
import { CircleBg } from '@ui/atoms/CircleBg';

type UserAdminCardProps = {
  user: StringifyProperties<IUser> | IUser;
  isHeader?: boolean;
  onClickActions?: OnClickActionsType;
};

export function UserAdminCard({
  user,
  isHeader,
  onClickActions,
}: UserAdminCardProps) {
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && 'bg-teal-500 text-white'} flex ${
          isHeader ? 'h-10' : 'h-14'
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <div className="px-3 w-1/12 text-center break-words">
          {!isHeader && onClickActions && (
            <div className="flex">
              <IconButton
                icon={trashIcon}
                color="redNoBg"
                onClick={() => onClickActions('delete', user)}
              />
              <IconButton
                icon={notePencilIcon}
                color="neutralNoBg"
                onClick={() => onClickActions('edit', user)}
              />
            </div>
          )}
        </div>
        <div className="px-3 w-2/12 flex justify-center items-center" dir="ltr">
          <Typography size="body3" type="div" className="uppercase">
            {user.username}
          </Typography>
        </div>
        <div className="px-3 w-2/12 flex justify-center items-center" dir="ltr">
          <Typography size="body3" type="div" className="uppercase">
            {user.email}
          </Typography>
        </div>

        <div className="px-3 w-2/12 flex justify-center items-center" dir="ltr">
          <Typography size="body3" type="div" className="uppercase">
            {`${user.first_name} ${user.last_name}`}
          </Typography>
        </div>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-1/12 flex justify-center items-center uppercase"
        >
          {isHeader ? (
            user.is_active
          ) : (
            <CircleBg
              bgColor={user.is_active ? 'bg-green-600' : 'bg-gray-400'}
            />
          )}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 flex justify-center items-center uppercase"
        >
          {booleanIcon(user.is_meta_admin)}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {!isHeader ? dateAndNumber(user.created_at) : user.created_at}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {!isHeader ? dateAndNumber(user.last_login) : user.last_login}
        </Typography>
      </Card>
    </>
  );
}
