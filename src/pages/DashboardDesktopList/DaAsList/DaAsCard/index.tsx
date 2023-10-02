import { Card, Typography } from "@ui/atoms";
import { IDaAs } from "@src/services/users/types";
import { IconButton } from "@ui/atoms/BaseButton";
import { SetAccessTime } from "./SetAccessTime";

export type OnClickActionsType = (
  action: "delete" | "edit" | "details" | "mutate",
  value?: number | string
) => void;

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
              icon="ic:baseline-delete"
              color="redNoBg"
              onClick={() => onClickActions("delete", daas.id)}
            />
          )}
        </div>

        <div className="px-3 w-6/12 text-center break-words">
          {!isHeader ? (
            <SetAccessTime
              id={daas.id as string}
              onClickActions={onClickActions}
              timeLimitValue={daas.time_limit_value_in_hour}
              timeLimitDuration={daas.time_limit_duration}
            />
          ) : (
            <Typography size="body3">زمان دسترسی</Typography>
          )}
        </div>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words"
        >
          {daas.email}
        </Typography>
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
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {daas.https_port}
        </Typography>
      </Card>
    </>
  );
}
