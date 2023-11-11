import { Card, Typography } from "@ui/atoms";
import { CircleBg } from "@ui/atoms/CircleBg";
import { OnClickActionsType } from "./types";
import { IScannedFile } from "@src/services/analyze/types";
import { StringifyProperties } from "@src/types/global";

type ProductCardProps = {
  scannedFile: StringifyProperties<IScannedFile> | IScannedFile;
  isHeader?: boolean;
  onClickActions?: OnClickActionsType;
};

export function ScannedFileCard({ scannedFile, isHeader }: ProductCardProps) {
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && "bg-teal-500 text-white"} flex ${
          isHeader ? "h-10" : "h-14"
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        {/* <div className="px-3 w-1/12 text-center break-words">
          {!isHeader && onClickActions && (
            <IconButton
              icon={trashIcon}
              color="redNoBg"
              onClick={() => onClickActions("delete", daas)}
            />
          )}
        </div> */}
        {/* <div className="px-3 w-2/12 text-center break-words">
          {!isHeader && onClickActions ? (
            <SetAccessUpload daas={daas} onClickActions={onClickActions} />
          ) : (
            <Typography size="body3">{daas.can_upload_file}</Typography>
          )}
        </div> */}

        {/* <div className="px-3 w-5/12 text-center break-words">
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
        </div> */}

        <div className="w-3/12 text-center break-words">
          <Typography size="body3">{scannedFile.file_name}</Typography>
        </div>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {scannedFile.file_content_type}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {isHeader ? (
            scannedFile.yara_scanner_status
          ) : (
            <span className="flex justify-around items-center">
              <CircleBg
                bgColor={
                  scannedFile.yara_scan_result ? "bg-red-600" : "bg-green-400"
                }
              />
              {scannedFile.yara_scanner_status}
            </span>
          )}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {isHeader ? (
            scannedFile.clamav_scanner_status
          ) : (
            <span className="flex justify-around items-center">
              <CircleBg
                bgColor={
                  scannedFile.clamav_scan_result ? "bg-red-600" : "bg-green-400"
                }
              />
              {scannedFile.clamav_scanner_status}
            </span>
          )}
        </Typography>
        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 text-center break-words uppercase"
        >
          {isHeader ? (
            scannedFile.antiviruses_scanner_status
          ) : (
            <span className="flex justify-around items-center">
              <CircleBg
                bgColor={
                  scannedFile.antiviruses_scan_result
                    ? "bg-red-600"
                    : "bg-green-400"
                }
              />
              {scannedFile.antiviruses_scanner_status}
            </span>
          )}
        </Typography>

        {/* <div className="px-3 w-1/12 flex justify-center text-center break-words">
          {!isHeader ? (
            <IconButton icon={moreIcon} color="neutral" onClick={() => true} />
          ) : (
            <Typography size="body3">{scannedFile.id}</Typography>
          )}
        </div> */}
      </Card>
    </>
  );
}
