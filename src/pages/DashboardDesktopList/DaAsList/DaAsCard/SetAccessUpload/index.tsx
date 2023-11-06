import { IDaAs } from "@src/services/users/types";
import ToolTip from "@ui/atoms/Tooltip";
import { OnClickActionsType } from "../types";
import gear from "@iconify-icons/ph/gear";
import { IconButton } from "@ui/atoms/BaseButton";

type PropsType = {
  daas: IDaAs;
  onClickActions?: OnClickActionsType;
};

export function SetAccessUpload({ daas, onClickActions }: PropsType) {
  return (
    <ToolTip tooltip="تنظیمات">
      <IconButton
        icon={gear}
        onClick={() => {
          onClickActions && onClickActions("edit", daas);
        }}
      />
    </ToolTip>
  );
}
