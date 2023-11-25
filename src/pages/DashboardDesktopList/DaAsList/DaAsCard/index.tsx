import { BaseIcon, Card, Typography } from "@ui/atoms";
import { IDaAs } from "@src/services/users/types";
import { IconButton } from "@ui/atoms/BaseButton";
import trashIcon from "@iconify-icons/ph/trash";
import lockKeyFillIcon from "@iconify-icons/ph/lock-key-fill";
import lockKeyOpenFillIcon from "@iconify-icons/ph/lock-key-open-fill";
import checkBoldIcon from "@iconify-icons/ph/check-bold";
import xIcon from "@iconify-icons/ph/x";

import { SetAccessTime } from "./SetAccessTime";
import { CircleBg } from "@ui/atoms/CircleBg";
import { SetAccessUpload } from "./SetAccessUpload";
import { OnClickActionsType } from "./types";
import { IHeaderDaasCard } from "../types";
import { IDaasConfig } from "@src/services/config/types";

type ProductCardProps = {
  daas: IHeaderDaasCard | IDaAs;
  isHeader?: boolean;
  onClickActions?: OnClickActionsType;
};

// Use a conditional type to determine if isHeader exists

export function DaAsCard({ daas, isHeader, onClickActions }: ProductCardProps) {
  const daasConfig = daas.daas_configs as IDaasConfig;
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && "bg-teal-500 text-white"} flex ${
          isHeader ? "h-10" : "h-14"
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <div className="w-1/12 flex justify-center items-center">
          {!isHeader && onClickActions && (
            <IconButton
              icon={trashIcon}
              color="redNoBg"
              onClick={() => onClickActions("delete", daas as IDaAs)}
            />
          )}
        </div>

        <div className="w-1/12 text-center break-words">
          {!isHeader && onClickActions ? (
            <SetAccessUpload
              daas={daas as IDaAs}
              onClickActions={onClickActions}
            />
          ) : (
            <Typography size="body3">{daasConfig.can_upload_file}</Typography>
          )}
        </div>

        <div className="w-3/12 text-center break-words">
          {!isHeader ? (
            <SetAccessTime
              id={daas.id as string}
              onClickActions={onClickActions}
              timeLimitValue={daasConfig.time_limit_value_in_hour || 0}
              timeLimitDuration={daasConfig.time_limit_duration}
            />
          ) : (
            <Typography size="body3">تنظیمات زمان دسترسی</Typography>
          )}
        </div>
        <div className="w-1/12 text-center break-words">
          <Typography size="body3">
            {typeof daas.usage_in_minute === "string"
              ? daas.usage_in_minute
              : `${Math.floor(daas.usage_in_minute)} دقیقه`}
          </Typography>
        </div>
        {/* <Typography
          size="body3"
          type="div"
          className="px-3 w-1/12 text-center break-words uppercase"
        >
          {daas.http_port}
        </Typography> */}

        <Typography
          size="body3"
          type="div"
          className="w-1/12 text-center break-words flex justify-center items-center"
        >
          {isHeader
            ? daas.is_lock
            : onClickActions && (
                <IconButton
                  icon={daas.is_lock ? lockKeyFillIcon : lockKeyOpenFillIcon}
                  color={daas.is_lock ? "redNoBg" : "tealNoBg"}
                  onClick={() => {
                    const updatedUnlock: IDaAs = {
                      ...(daas as IDaAs),
                      is_lock: !daas.is_lock,
                    };
                    onClickActions("editLock", updatedUnlock);
                  }}
                />

                // <BaseIcon
                //   icon={daas.is_lock ? lockKeyFillIcon : lockKeyOpenFillIcon}
                //   color={daas.is_lock ? "red" : "teal"}
                // />
              )}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-1/12 text-center break-words uppercase"
        >
          {daas.daas_version}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="w-1/12 text-center flex justify-center items-center"
        >
          {isHeader ? (
            daas.is_running
          ) : (
            <CircleBg
              bgColor={daas.is_running ? "bg-teal-600" : "bg-gray-400"}
            />
          )}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="w-1/12 text-center break-words flex justify-center items-center"
        >
          {isHeader ? (
            daas.daas_configs.is_globally_config
          ) : (
            <BaseIcon
              icon={
                !daas.daas_configs.is_globally_config ? xIcon : checkBoldIcon
              }
              color={!daas.daas_configs.is_globally_config ? "red" : "teal"}
            />
          )}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {daas.email}
        </Typography>
      </Card>
    </>
  );
}
