import { Card, Typography } from "@ui/atoms";
import { IDaAs } from "@src/services/users/types";
import { IconButton } from "@ui/atoms/BaseButton";
import trashIcon from "@iconify-icons/ph/trash";

import { SetAccessTime } from "./SetAccessTime";
import { CircleBg } from "@ui/atoms/CircleBg";
import { SetAccessUpload } from "./SetAccessUpload";
import { OnClickActionsType } from "./types";

type ProductCardProps = {
  daas: IDaAs;
  isHeader?: boolean;
  onClickActions?: OnClickActionsType;
};

export function DaAsCard({ daas, isHeader, onClickActions }: ProductCardProps) {
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && "bg-teal-500 text-white"} flex ${
          isHeader ? "h-10" : "h-14"
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <div className="px-3 w-1/12 text-center break-words">
          {!isHeader && onClickActions && (
            <IconButton
              icon={trashIcon}
              color="redNoBg"
              onClick={() => onClickActions("delete", daas)}
            />
          )}
        </div>
        <div className="px-3 w-2/12 text-center break-words">
          {!isHeader && onClickActions ? (
            <SetAccessUpload daas={daas} onClickActions={onClickActions} />
          ) : (
            <Typography size="body3">{daas.can_upload_file}</Typography>
          )}
        </div>

        <div className="px-3 w-5/12 text-center break-words">
          {!isHeader ? (
            <SetAccessTime
              id={daas.id as string}
              onClickActions={onClickActions}
              timeLimitValue={daas.time_limit_value_in_hour}
              timeLimitDuration={daas.time_limit_duration}
            />
          ) : (
            <Typography size="body3">تنظیمات زمان دسترسی</Typography>
          )}
        </div>
        <div className="w-2/12 text-center break-words">
          <Typography size="body3">
            {typeof daas.usage_in_minute === "string"
              ? daas.usage_in_minute
              : `${Math.floor(daas.usage_in_minute)} دقیقه`}
          </Typography>
        </div>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {daas.http_port}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {daas.email}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="w-1/12 text-center break-words"
        >
          {isHeader ? (
            daas.is_running
          ) : (
            <CircleBg
              bgColor={daas.is_running ? "bg-green-600" : "bg-gray-400"}
            />
          )}
        </Typography>
      </Card>
    </>
  );
}
