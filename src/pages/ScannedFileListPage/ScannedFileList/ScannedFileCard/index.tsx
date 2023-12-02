import { Card, Typography } from "@ui/atoms";
import { CircleBg } from "@ui/atoms/CircleBg";
import { IScannedFile } from "@src/services/analyze/types";
import { StringifyProperties } from "@src/types/global";

import { IconButton } from "@ui/atoms/BaseButton";
import moreIcon from "@iconify-icons/ph/dots-three-outline-fill";

type ProductCardProps = {
  scannedFile: StringifyProperties<IScannedFile> | IScannedFile;
  isHeader?: boolean;
  onOpenDetailModal?: () => void;
};

export function ScannedFileCard({
  scannedFile,
  isHeader,
  onOpenDetailModal,
}: ProductCardProps) {
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && "bg-teal-500 text-white"} flex ${
          isHeader ? "h-10" : "h-14"
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <div className="w-3/12 text-center break-words" dir="ltr">
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
            <span className="flex justify-around items-center border rounded-md">
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
            <span className="flex justify-around items-center border rounded-md">
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
            <span className="flex justify-around items-center border rounded-md">
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

        <div className="px-3 w-1/12 flex justify-center text-center break-words">
          {!isHeader && onOpenDetailModal ? (
            <IconButton
              icon={moreIcon}
              color="neutralNoBg"
              onClick={onOpenDetailModal}
            />
          ) : (
            <Typography size="body3">{scannedFile.id}</Typography>
          )}
        </div>
      </Card>
    </>
  );
}
