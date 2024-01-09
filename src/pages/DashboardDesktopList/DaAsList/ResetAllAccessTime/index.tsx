import { useState } from 'react';
import { IconButton } from '@ui/atoms/BaseButton';
import clockCounterClockwiseIcon from '@iconify-icons/ph/clock-counter-clockwise';

import { API_DAAS_RESET_ALL_USAGE_DAAS } from '@src/services/users';
import { toast } from 'react-toastify';

import ToolTip from '@ui/atoms/Tooltip';
import { Modal } from '@ui/molecules/Modal';
import { useTranslation } from 'react-i18next';

export function ResetAllAccessTime() {
  const { t } = useTranslation();
  const [loadingResetButton, setLoadingResetButton] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  const handleOnResetAccess = async () => {
    setLoadingResetButton(true);
    await API_DAAS_RESET_ALL_USAGE_DAAS()
      .then(() => {
        toast.success(t('global.successfullySet'));
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
      <ToolTip tooltip={t('global.restartTimeUsed')}>
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
        title={t('title.acessTimeModalDescription1')}
        buttonOne={{
          label: t('global.yes'),
          onClick: handleOnResetAccess,
          loading: loadingResetButton,
        }}
        buttonTow={{
          label: t('global.no'),
          onClick: () => setOpenModalDelete(false),
          color: 'red',
        }}
      />
    </>
  );
}
