import { Card, Typography } from '@ui/atoms';
import { ETimeLimitDuration } from '@src/services/users/types';
import { IconButton } from '@ui/atoms/BaseButton';
import trashIcon from '@iconify-icons/ph/trash';
import gearIcon from '@iconify-icons/ph/gear';
import { IDaasConfig } from '@src/services/config/types';
import { StringifyProperties } from '@src/types/global';
import { TimeLimitDurationLabel } from '@src/constants/accessTime';

import { OnClickActionsType } from './types';
import { booleanIcon } from '../utils';

type ProductCardProps = {
  daasConfig: StringifyProperties<IDaasConfig> | IDaasConfig;
  isHeader?: boolean;
  onClickActions?: OnClickActionsType;
};

export function DlpConfigCard({
  daasConfig,
  isHeader,
  onClickActions,
}: ProductCardProps) {
  return (
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
              onClick={() => onClickActions('delete', daasConfig)}
            />
            <IconButton
              icon={gearIcon}
              color="neutralNoBg"
              onClick={() => onClickActions('edit', daasConfig)}
            />
          </div>
        )}
      </div>

      <Typography
        size="body3"
        type="div"
        className="px-3 w-1/12 flex justify-center items-center uppercase"
      >
        {booleanIcon(daasConfig.can_upload_file)}
      </Typography>
      <Typography
        size="body3"
        type="div"
        className="px-3 w-1/12 flex justify-center items-center uppercase"
      >
        {booleanIcon(daasConfig.can_download_file)}
      </Typography>
      <Typography
        size="body3"
        type="div"
        className="px-3 w-2/12 flex justify-center items-center uppercase"
      >
        {booleanIcon(daasConfig.clipboard_down)}
      </Typography>

      <Typography
        size="body3"
        type="div"
        className="px-3 w-2/12 flex justify-center items-center uppercase"
      >
        {booleanIcon(daasConfig.clipboard_up)}
      </Typography>

      <Typography
        size="body3"
        type="div"
        className="px-3 w-1/12 flex justify-center items-center uppercase"
      >
        {booleanIcon(daasConfig.webcam_privilege)}
      </Typography>
      <Typography
        size="body3"
        type="div"
        className="px-3 w-1/12 flex justify-center items-center uppercase"
      >
        {booleanIcon(daasConfig.microphone_privilege)}
      </Typography>

      <Typography
        size="body3"
        type="div"
        className="px-3 w-2/12 text-center break-words uppercase"
      >
        {!isHeader
          ? `${daasConfig.time_limit_value_in_hour ?? '-'} / ${
              TimeLimitDurationLabel[
                daasConfig.time_limit_duration as ETimeLimitDuration
              ]
            }`
          : daasConfig.time_limit_duration}
      </Typography>

      <Typography
        size="body3"
        type="div"
        className="px-3 w-1/12 text-center break-words"
      >
        {isHeader
          ? daasConfig.max_transmission_download_size
          : `${daasConfig.max_transmission_download_size}mb`}
      </Typography>
      <Typography
        size="body3"
        type="div"
        className="px-3 w-1/12 text-center break-words"
      >
        {isHeader
          ? daasConfig.max_transmission_upload_size
          : `${daasConfig.max_transmission_upload_size}mb`}
      </Typography>
    </Card>
  );
}
