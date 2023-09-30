import { Typography } from "@ui/atoms/Typography/Typography";
import { Card } from "@ui/atoms";
import { Modal } from "@ui/molecules/Modal";
import { useState } from "react";

export function AccessTime() {
  const [openModalDelete, setOpenModalDelete] = useState(true);

  return (
    <>
      <Card
        color="neutral"
        className="flex items-center justify-between w-64 px-2"
      >
        <Typography size="body3" color="teal">
          زمان دسترسی
        </Typography>
        <div className="flex items-center justify-between w-1/2">
          <Typography size="body3" color="neutral">
            روزانه
          </Typography>
          |
          <Typography size="body3" color="neutral">
            10 ساعت
          </Typography>
        </div>
      </Card>
      {/* 
      <Modal
        open={openModalDelete}
        setOpen={setOpenModalDelete}
        type="error"
        title="از حذف این Desktop مطمئن هستید؟"
      /> */}
    </>
  );
}
