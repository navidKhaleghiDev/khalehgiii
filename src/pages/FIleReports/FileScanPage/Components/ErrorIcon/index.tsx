import { useState } from 'react';

import { IconButton } from '@redesignUi/atoms/BaseButton';
import { Modal } from '@redesignUi/molecules/Modal';
import PhWarning from '@iconify-icons/ph/warning';

import { BaseTableComponentCellProps } from '@redesignUi/molecules/BaseTable/types';
import { ScannedFile } from '@src/services/analyze/types';
import { DetailsContentModal } from '../ErrorInofModal/idnex';

type TagProps = {
  data: BaseTableComponentCellProps<ScannedFile>;
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
      <div dir="ltr">
        <Modal
          open={openDetailsModal}
          setOpen={setOpenDetailsModal}
          type="warning"
          size="responsive"
          icon={PhWarning}
          content={<DetailsContentModal scannedFile={data.row} />}
        />
      </div>
    </div>
  );
}
