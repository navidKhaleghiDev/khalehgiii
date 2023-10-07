import { useState } from "react";
import { IconButton } from "@ui/atoms/BaseButton";
import clockCounterClockwiseIcon from "@iconify-icons/ph/clock-counter-clockwise";

import { API_DAAS_RESET_ALL_USAGE_DAAS } from "@src/services/users";
import { toast } from "react-toastify";

import ToolTip from "@ui/atoms/Tooltip";
import { Modal } from "@ui/molecules/Modal";

export function ResetAllAccessTime() {
  const [loadingResetButton, setLoadingResetButton] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleOnResetAccess = async () => {
    setLoadingResetButton(true);
    await API_DAAS_RESET_ALL_USAGE_DAAS()
      .then(() => {
        toast.success("با موفقیت تنظیم شد");
        setOpenModalDelete(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingResetButton(false);
      });
  };

  return (
    <>
      <ToolTip tooltip="شروع مجدد تمام دسترسی ها">
        <IconButton
          icon={clockCounterClockwiseIcon}
          color="redNoBg"
          size="xxl"
          onClick={() => setOpenModalDelete(true)}
        />
      </ToolTip>
      <Modal
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        type="error"
        title="با انجام این کار زمان دسترسی تمامی کاربران به حالت اول بر می گردد. مطمئن هستید؟"
        buttonOne={{
          label: "بله",
          onClick: handleOnResetAccess,
          loading: loadingResetButton,
        }}
        buttonTow={{
          label: "خیر",
          onClick: () => setOpenModalDelete(false),
          color: "red",
        }}
      />
    </>
  );
}
