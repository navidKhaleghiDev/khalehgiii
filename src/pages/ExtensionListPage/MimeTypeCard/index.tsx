import { Card, Typography } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';
import trashIcon from '@iconify-icons/ph/trash';
import { StringifyProperties } from '@src/types/global';
import { dateAndNumber } from '@src/helper/utils/dateUtils';
import { IMimeType } from '@src/services/analyze/types';

import { OnClickActionsType } from './types';

type MimeTypeCardProps = {
  mimeType: StringifyProperties<IMimeType> | IMimeType;
  isHeader?: boolean;
  onClickActions?: OnClickActionsType;
};

export function MimeTypeCard({
  mimeType,
  isHeader,
  onClickActions,
}: MimeTypeCardProps) {
  return (
    <Card
      color="neutral"
      className={`${isHeader && 'bg-teal-500 text-white'} flex ${
        isHeader ? 'h-10' : 'h-14'
      } items-center px-2 my-2 w-full text-neutral-600`}
    >
      <div className="px-3 w-2/12 text-center break-words">
        {!isHeader && onClickActions && (
          <div className="flex">
            <IconButton
              icon={trashIcon}
              color="redNoBg"
              onClick={() => onClickActions('delete', mimeType)}
            />
          </div>
        )}
      </div>

      <div className="px-3 w-4/12 flex justify-center items-center" dir="ltr">
        <Typography variant="body3" type="div" className="uppercase">
          {Array.isArray(mimeType.mimetype_list)
            ? mimeType.mimetype_list.join(' , ')
            : mimeType.mimetype_list}
        </Typography>
      </div>

      <div className="px-3 w-3/12 flex justify-center items-center" dir="ltr">
        <Typography variant="body3" type="div" className="uppercase">
          {Array.isArray(mimeType.extension_list)
            ? mimeType.extension_list.join(' , ')
            : mimeType.extension_list}
        </Typography>
      </div>
      <Typography
        variant="body3"
        type="div"
        className="px-3 w-3/12 text-center break-words uppercase"
      >
        {!isHeader ? dateAndNumber(mimeType.created_at) : mimeType.created_at}
      </Typography>
    </Card>
  );
}
