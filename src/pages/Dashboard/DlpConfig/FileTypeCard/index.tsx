import { Card, Typography } from "@ui/atoms";
import { IconButton } from "@ui/atoms/BaseButton";
import trashIcon from "@iconify-icons/ph/trash";
import notePencilIcon from "@iconify-icons/ph/note-pencil";
import { IFileType } from "@src/services/config/types";
import { StringifyProperties } from "@src/types/global";

import { OnClickActionsType } from "./types";
import { booleanIcon } from "../utils";
import { CircleBg } from "@ui/atoms/CircleBg";
import { persianDateAndNumber } from "@src/helper/utils/dateUtils";

type FileTypeCardProps = {
  fileType: StringifyProperties<IFileType> | IFileType;
  isHeader?: boolean;
  onClickActions?: OnClickActionsType;
};

export function FileTypeCard({
  fileType,
  isHeader,
  onClickActions,
}: FileTypeCardProps) {
  return (
    <>
      <Card
        color="neutral"
        className={`${isHeader && "bg-teal-500 text-white"} flex ${
          isHeader ? "h-10" : "h-14"
        } items-center px-2 my-2 w-full text-neutral-600`}
      >
        <div className="px-3 w-2/12 text-center break-words">
          {!isHeader && onClickActions && (
            <div className="flex">
              <IconButton
                icon={trashIcon}
                color="redNoBg"
                onClick={() => onClickActions("delete", fileType)}
              />
              <IconButton
                icon={notePencilIcon}
                color="neutralNoBg"
                onClick={() => onClickActions("edit", fileType)}
              />
            </div>
          )}
        </div>
        <div className="px-3 w-2/12 flex justify-center items-center" dir="ltr">
          <Typography size="body3" type="div" className="uppercase">
            {fileType.file_type}
          </Typography>
        </div>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 flex justify-center items-center uppercase"
        >
          {booleanIcon(fileType.allowed_for_download)}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 flex justify-center items-center uppercase"
        >
          {booleanIcon(fileType.allowed_for_upload)}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-2/12 flex justify-center items-center uppercase"
        >
          {booleanIcon(fileType.is_active)}
          {/* {isHeader ? (
            fileType.is_active
          ) : (
            <CircleBg
              bgColor={fileType.is_active ? "bg-green-600" : "bg-gray-400"}
            />
          )} */}
        </Typography>

        <Typography
          size="body3"
          type="div"
          className="px-3 w-4/12 text-center break-words uppercase"
        >
          {!isHeader
            ? persianDateAndNumber(fileType.updated_at)
            : fileType.updated_at}
        </Typography>
      </Card>
    </>
  );
}
