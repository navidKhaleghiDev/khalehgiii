import { Typography } from '@ui/atoms/Typography/Typography';
import { BaseInput, Card } from '@ui/atoms';
import { useEffect, useState } from 'react';
import { BaseButton, IconButton } from '@ui/atoms/BaseButton';
import { Divider } from '@ui/atoms/Divider';
import { FieldValues, useForm } from 'react-hook-form';
import { Dropdown } from '@ui/atoms/DropDown';
import notePencilIcon from '@iconify-icons/ph/note-pencil';
import clockCounterClockwiseIcon from '@iconify-icons/ph/clock-counter-clockwise';
import xIcon from '@iconify-icons/ph/x';

import {
  API_DAAS_RESET_USAGE_DAAS,
  API_DAAS_UPDATE,
} from '@src/services/users';
import { toast } from 'react-toastify';
import { regexPattern } from '@ui/atoms/Inputs';
import { ETimeLimitDuration } from '@src/services/users/types';
import { TimeLimitDurationLabel } from '@src/constants/accessTime';
import ToolTip from '@ui/atoms/Tooltip';
import { Modal } from '@ui/molecules/Modal';
import { OnClickActionsType } from '../types';
import { useTranslation } from 'react-i18next';

interface IUpdateDaasValues extends FieldValues {
  time_limit_duration: ETimeLimitDuration;
  time_limit_value_in_hour?: number;
}

export const timeLimitDurationOptions = [
  {
    id: ETimeLimitDuration.DAILY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.DAILY],
    value: ETimeLimitDuration.DAILY,
  },
  {
    id: ETimeLimitDuration.WEEKLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.WEEKLY],
    value: ETimeLimitDuration.WEEKLY,
  },
  {
    id: ETimeLimitDuration.MONTHLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.MONTHLY],
    value: ETimeLimitDuration.MONTHLY,
  },
  {
    id: ETimeLimitDuration.PERMANENTLY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.PERMANENTLY],
    value: ETimeLimitDuration.PERMANENTLY,
  },
  {
    id: ETimeLimitDuration.TEMPORARY,
    label: TimeLimitDurationLabel[ETimeLimitDuration.TEMPORARY],
    value: ETimeLimitDuration.TEMPORARY,
  },
];

type PropsType = {
  id: string;
  onClickActions?: OnClickActionsType;
  timeLimitDuration: ETimeLimitDuration;
  timeLimitValue: number;
};

export function SetAccessTime({
  id,
  onClickActions,
  timeLimitDuration,
  timeLimitValue,
}: PropsType) {
  const { t } = useTranslation();
  const [isEditable, setIsEditable] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingResetButton, setLoadingResetButton] = useState(false);

  const [openModalDelete, setOpenModalDelete] = useState(false);
  const { control, handleSubmit, reset, watch } = useForm<IUpdateDaasValues>({
    mode: 'onChange',
  });

  useEffect(() => {
    if (timeLimitDuration && timeLimitValue) {
      reset({
        time_limit_duration: timeLimitDuration,
        time_limit_value_in_hour: timeLimitValue,
      });
    }
  }, []);

  const handleOnCancel = () => {
    reset();
    setIsEditable(false);
  };

  const handleOnSubmit = async (data: IUpdateDaasValues) => {
    setLoadingButton(true);

    await API_DAAS_UPDATE(id, {
      daas_configs: {
        ...data,
        time_limit_value_in_hour: Number(data.time_limit_value_in_hour),
      },
    })
      .then(() => {
        setIsEditable(false);
        toast.success(t('global.sucessfulyUpdated'));
        onClickActions && onClickActions('mutate');
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingButton(false);
      });
  };

  const handleOnResetAccess = async () => {
    setLoadingResetButton(true);
    await API_DAAS_RESET_USAGE_DAAS(id)
      .then(() => {
        toast.success(t('global.successfullySet'));
        onClickActions && onClickActions('mutate');
        setOpenModalDelete(false);
      })
      .catch((err) => {
        toast.error(err);
      })
      .finally(() => {
        setLoadingResetButton(false);
      });
  };

  const isPermanently =
    watch('time_limit_duration') === ETimeLimitDuration.PERMANENTLY;

  return (
    <div className="w-full flex justify-center">
      {!isEditable ? (
        <Card color="white" className="px-2 h-6 w-64 ">
          <div className="flex items-center justify-between  h-full">
            <div className="flex items-center justify-between text-teal-600">
              <Typography size="body4" color="teal">
                {TimeLimitDurationLabel[timeLimitDuration]}
              </Typography>
              <div className="h-4 px-7">
                <Divider vr />
              </div>
              <Typography size="body4" color="teal">
                {timeLimitDuration !== ETimeLimitDuration.PERMANENTLY
                  ? `${timeLimitValue} ${t('global.hour')}`
                  : '---'}
              </Typography>
            </div>
            <IconButton
              icon={notePencilIcon}
              color="tealNoBg"
              onClick={() => setIsEditable(true)}
            />
            <ToolTip tooltip={t('global.restart')}>
              <IconButton
                icon={clockCounterClockwiseIcon}
                color="redNoBg"
                onClick={() => setOpenModalDelete(true)}
              />
            </ToolTip>
            <Modal
              open={openModalDelete}
              setOpen={setOpenModalDelete}
              type="error"
              title={t('global.restart')}
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
          </div>
        </Card>
      ) : (
        <form
          className="grid grid-cols-12 items-center gap-2"
          onSubmit={handleSubmit(handleOnSubmit)}
        >
          <Dropdown
            control={control}
            size="xs"
            id="time_limit_duration"
            name="time_limit_duration"
            options={timeLimitDurationOptions}
            placeHolder={t('global.select')}
            containerClassName="col-span-6 xl:col-span-4"
            rules={{
              required: regexPattern.required,
            }}
            fullWidth
            hiddenError
          />
          <div className="col-span-6 lg:col-span-4">
            {!isPermanently && (
              <BaseInput
                control={control}
                size="xs"
                id="time_limit_value_in_hour"
                name="time_limit_value_in_hour"
                placeholder={t('global.selectHour')}
                rules={{
                  required: regexPattern.required,
                  pattern: regexPattern.numbers,
                }}
                fullWidth
                hiddenError
              />
            )}
          </div>

          <div className="col-span-6 lg:col-span-4 flex justify-start items-center">
            <BaseButton
              label={t('global.confirm')}
              submit
              size="sm"
              loading={loadingButton}
              className="ml-2"
            />
            <IconButton icon={xIcon} color="red" onClick={handleOnCancel} />
          </div>
        </form>
      )}
    </div>
  );
}
