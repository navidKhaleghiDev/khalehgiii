import { EAccessMode, IDaAs } from "@src/services/users/types";
import ToolTip from "@ui/atoms/Tooltip";
import { BaseSwitch } from "@ui/atoms/Inputs/BaseSwitch";
import { OnClickActionsType } from "../types";

type PropsType = {
  daas: IDaAs;
  onClickActions?: OnClickActionsType;
};

export function SetAccess({ daas, onClickActions }: PropsType) {
  const handleOnChange = () => {
    onClickActions &&
      onClickActions("edit", {
        id: daas.id,
        access_mode:
          daas.access_mode === EAccessMode.HAS_ACCESS
            ? EAccessMode.NO_ACCESS
            : EAccessMode.HAS_ACCESS,
      });
  };

  return (
    <ToolTip tooltip="تغییر دسترسی">
      <BaseSwitch
        name="access_mode"
        pureValue={daas.access_mode === EAccessMode.HAS_ACCESS ? true : false}
        defaultChecked={
          daas.access_mode === EAccessMode.HAS_ACCESS ? true : false
        }
        pureOnChange={handleOnChange}
      />
    </ToolTip>
  );
}
