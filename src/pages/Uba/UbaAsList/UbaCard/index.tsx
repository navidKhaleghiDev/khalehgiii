import { BaseIcon, Card, Typography } from "@ui/atoms";
import lockKeyFillIcon from "@iconify-icons/ph/lock-key-fill";
import lockKeyOpenFillIcon from "@iconify-icons/ph/lock-key-open-fill";
import { persianDateAndNumber } from "@src/helper/utils/dateUtils";
import { IUba } from "@src/services/analyze/types";
import { StringifyProperties } from "@src/types/global";

type ProductCardProps = {
  uba: StringifyProperties<IUba> | IUba;
  isHeader?: boolean;
};

export function UbaCard({ uba, isHeader }: ProductCardProps) {
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && "bg-teal-500 text-white"} flex ${
          isHeader ? "h-10" : "h-14"
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {uba.username}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {!isHeader ? persianDateAndNumber(uba.updated_at) : uba.updated_at}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {uba.original_file_name}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words truncate"
        >
          {uba.file_names}
        </Typography>

        <Typography size="body3" type="div" className="px-3 w-1/12 text-center">
          {uba.malbehave_count}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="w-1/12 text-center break-words"
        >
          {isHeader ? (
            uba.is_ban
          ) : (
            <div className="w-full flex justify-center">
              <BaseIcon
                icon={uba.is_ban ? lockKeyFillIcon : lockKeyOpenFillIcon}
                color={uba.is_ban ? "red" : "teal"}
              />
            </div>
          )}
        </Typography>
        <Typography size="body3" type="div" className="px-3 w-1/12 text-center">
          {uba.transmission_type}
        </Typography>
      </Card>
    </>
  );
}
