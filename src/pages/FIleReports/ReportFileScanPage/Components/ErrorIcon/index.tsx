import { useState } from 'react';

import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Modal } from '@redesignUi/molecules/Modal';
import PhWarning from '@iconify-icons/ph/warning';

import { DetailsContentModal } from '../ErrorInofModal/idnex';

type TagProps = {
  data: any;
};
export function ErrorIcon({ data }: TagProps) {
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const clear = !!(
    data.row?.antiviruses_scan_result ||
    data.row?.clamav_scan_result ||
    data.row?.yara_scan_result
  );
  return (
    <div>
      {clear ? (
        <IconButton
          icon={PhWarning}
          color="redNoBg"
          onClick={() => setOpenDetailsModal(true)}
        />
      ) : null}
      <Modal
        open={openDetailsModal}
        setOpen={setOpenDetailsModal}
        type="content"
        size="responsive"
        content={<DetailsContentModal scannedFile={data.row} />}
      />
    </div>
  );
}
