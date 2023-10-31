import { EAccessMode, IDaAs } from "@src/services/users/types";
import ToolTip from "@ui/atoms/Tooltip";
import { BaseSwitch } from "@ui/atoms/Inputs/BaseSwitch";
import { OnClickActionsType } from "../types";
import { Modal } from "@ui/molecules/Modal";
import gear from "@iconify-icons/ph/gear";
import { useState } from "react";
import { BaseButton, IconButton } from "@ui/atoms/BaseButton";
import { Typography } from "@ui/atoms";

type PropsType = {
  daas: IDaAs;
  onClickActions?: OnClickActionsType;
};

function ContentModal({ handleOnChange }: any) {
  const [setting, setSetting] = useState({
    accessUpload: false,
    accessTerminal: false,
    accessClipboardServer: false,
    accessClipboardClient: false,
  });
  return (
    <div className="w-full h-full grid grid-cols-6 gap-8 p-4">
      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch
          name="access_mode"
          pureValue={false}
          defaultChecked={false}
          pureOnChange={() => true}
        />
        <Typography className="mb-1">:Upload</Typography>
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch
          name="access_mode"
          pureValue={false}
          defaultChecked={false}
          pureOnChange={() => true}
        />
        <Typography className="mb-1">:Terminal</Typography>
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch
          name="access_mode"
          pureValue={false}
          defaultChecked={false}
          pureOnChange={() => true}
        />
        <Typography className="mb-1">:Clipboard from Server</Typography>
      </div>

      <div className="flex justify-between items-center px-2 col-span-3">
        <BaseSwitch
          name="access_mode"
          pureValue={false}
          defaultChecked={false}
          pureOnChange={() => true}
        />
        <Typography className="mb-1">:Clipboard from Client</Typography>
      </div>

      <div className="flex justify-center col-span-6">
        <BaseButton label={"ثبت"} size="md" />
      </div>
    </div>
  );
}

export function SetAccessUpload({ daas, onClickActions }: PropsType) {
  const [openModal, setOpenModal] = useState(false);

  const handleOnChange = ({
    accessUpload,
    accessTerminal,
    accessClipboardServer,
    accessClipboardClient,
  }: any) => {
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
    <>
      <ToolTip tooltip="تنظیمات">
        <IconButton icon={gear} onClick={() => setOpenModal(true)} />
        {/* <BaseSwitch
          name="access_mode"
          pureValue={daas.access_mode === EAccessMode.HAS_ACCESS ? true : false}
          defaultChecked={
            daas.access_mode === EAccessMode.HAS_ACCESS ? true : false
          }
          pureOnChange={handleOnChange}
        /> */}
      </ToolTip>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        type="success"
        // title="از انجام این کار مطمئن هستید؟"
        content={<ContentModal handleOnChange={handleOnChange} />}
        // buttonOne={{
        //   label: "بله",
        //   onClick: handleOnRequests,
        //   loading: loadingButtonModal,
        // }}
        // buttonTow={{
        //   label: "خیر",
        //   onClick: () => setOpenModal(false),
        //   color: "red",
        // }}
      />
    </>
  );
}
