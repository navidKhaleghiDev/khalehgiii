import { ScannedFile } from '@src/services/analyze/types';
import { StringifyProperties } from '@src/types/global';

import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { CircleBg } from '@ui/atoms/CircleBg';
import { Card, Typography } from '@ui/atoms';
import { IconButton } from '@ui/atoms/BaseButton';

type ProductCardProps = {
  scannedFile: StringifyProperties<ScannedFile> | ScannedFile;
  isHeader?: boolean;
  onOpenDetailModal?: () => void;
};

export function ScannedFileCard({
  scannedFile,
  isHeader,
  onOpenDetailModal,
}: ProductCardProps) {
  const overflowUiStyle = {
    typo: !isHeader
      ? 'group-hover:text-gray-800 group-hover:overflow-visible rounded-md group-hover:whitespace-normal group-hover:border group-hover-border-gray-300 p-2 group-hover:bg-white group-hover:shadow-lg  transition duration-300 z-auto '
      : '',
    div: 'group w-3/12 text-center break-words whitespace-nowrap overflow-hidden overflow-ellipsis px-6  ',
  };

  return (
    <div className="relative">
      <Card
        color="neutral"
        className={`${isHeader && 'bg-teal-500 text-white relative'} flex ${
          isHeader ? 'h-10' : 'h-14'
        } items-center px-2 my-2 w-full text-gray-600`}
      >
        <div className={overflowUiStyle.div}>
          <Typography
            variant="body4"
            type="div"
            className={`${overflowUiStyle.typo} ${
              !isHeader ? 'font-bold' : ''
            } `}
          >
            {scannedFile.file_name}
          </Typography>
        </div>
        <div className={overflowUiStyle.div}>
          <Typography
            variant="body4"
            type="div"
            className={`${overflowUiStyle.typo} uppercase `}
          >
            {scannedFile.file_content_type}
          </Typography>
        </div>
        <Typography
          variant="body4"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {isHeader ? (
            scannedFile.yara_scanner_status
          ) : (
            <span className="flex justify-around items-center border rounded-md whitespace-nowrap overflow-hidden overflow-ellipsis">
              <CircleBg
                bgColor={
                  scannedFile.yara_scan_result ? 'bg-red-600' : 'bg-green-400'
                }
              />
              {scannedFile.yara_scanner_status}
            </span>
          )}
        </Typography>
        <Typography
          variant="body4"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {isHeader ? (
            scannedFile.clamav_scanner_status
          ) : (
            <span className="flex justify-around items-center border rounded-md">
              <CircleBg
                bgColor={
                  scannedFile.clamav_scan_result ? 'bg-red-600' : 'bg-green-400'
                }
              />
              {scannedFile.clamav_scanner_status}
            </span>
          )}
        </Typography>
        <Typography
          variant="body4"
          type="div"
          className="px-3 w-3/12 text-center break-words uppercase"
        >
          {isHeader ? (
            scannedFile.antiviruses_scanner_status
          ) : (
            <span className="flex justify-around items-center border rounded-md">
              <CircleBg
                bgColor={
                  scannedFile.antiviruses_scan_result
                    ? 'bg-red-600'
                    : 'bg-green-400'
                }
              />
              {scannedFile.antiviruses_scanner_status}
            </span>
          )}
        </Typography>

        <div className="px-3 w-2/12 flex justify-center text-center break-words uppercase">
          {!isHeader && onOpenDetailModal ? (
            <IconButton
              icon={moreIcon}
              color="neutralNoBg"
              onClick={onOpenDetailModal}
            />
          ) : (
            <Typography variant="body4">{scannedFile.id}</Typography>
          )}
        </div>
      </Card>
    </div>
  );
}
