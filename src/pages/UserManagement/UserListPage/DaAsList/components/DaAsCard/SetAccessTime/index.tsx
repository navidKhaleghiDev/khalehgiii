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
import { TimeLimitDuration } from '@src/services/users/types';
import { TimeLimitDurationLabel } from '@src/constants/accessTime';
import ToolTip from '@ui/atoms/Tooltip';
import { Modal } from '@ui/molecules/Modal';
import { useTranslation } from 'react-i18next';
import { OnClickActionsType } from '../types';

interface UpdateDaasValuesParam extends FieldValues {
  time_limit_duration: TimeLimitDuration;
  time_limit_value_in_hour?: number;
}

export const timeLimitDurationOptions = [
  {
    id: TimeLimitDuration.DAILY,
    label: TimeLimitDurationLabel[TimeLimitDuration.DAILY],
    value: TimeLimitDuration.DAILY,
  },
  {
    id: TimeLimitDuration.WEEKLY,
    label: TimeLimitDurationLabel[TimeLimitDuration.WEEKLY],
    value: TimeLimitDuration.WEEKLY,
  },
  {
    id: TimeLimitDuration.MONTHLY,
    label: TimeLimitDurationLabel[TimeLimitDuration.MONTHLY],
    value: TimeLimitDuration.MONTHLY,
  },
  {
    id: TimeLimitDuration.PERMANENTLY,
    label: TimeLimitDurationLabel[TimeLimitDuration.PERMANENTLY],
    value: TimeLimitDuration.PERMANENTLY,
  },
  {
    id: TimeLimitDuration.TEMPORARY,
    label: TimeLimitDurationLabel[TimeLimitDuration.TEMPORARY],
    value: TimeLimitDuration.TEMPORARY,
  },
];

type PropsType = {
  id: string;
  onClickActions?: OnClickActionsType;
  timeLimitDuration: TimeLimitDuration;
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
  const { control, handleSubmit, reset, watch } =
    useForm<UpdateDaasValuesParam>({
      mode: 'onChange',
    });

  useEffect(() => {
    if (timeLimitDuration && timeLimitValue) {
      reset({
        time_limit_duration: timeLimitDuration,
        time_limit_value_in_hour: timeLimitValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnCancel = () => {
    reset();
    setIsEditable(false);
  };

  const handleOnSubmit = async (data: UpdateDaasValuesParam) => {
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
        if (onClickActions) onClickActions('mutate');
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
        if (onClickActions) onClickActions('mutate');
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
    watch('time_limit_duration') === TimeLimitDuration.PERMANENTLY;

  return (
    <div className="flex justify-center w-full">
      {!isEditable ? (
        <Card color="white" className="px-2 h-6 w-64 ">
          <div className="flex items-center justify-between  h-full">
            <div className="flex items-center justify-between text-teal-600">
              <Typography variant="body4" color="teal">
                {TimeLimitDurationLabel[timeLimitDuration]}
              </Typography>
              <div className="h-4 px-7">
                <Divider vr />
              </div>
              <Typography variant="body4" color="teal">
                {timeLimitDuration !== TimeLimitDuration.PERMANENTLY
                  ? `${timeLimitValue} ${t('global.hour')}`
                  : '---'}
              </Typography>
            </div>
            <IconButton
              icon={notePencilIcon}
              color="tealNoBg"
              onClick={() => setIsEditable(true)}
            />
            <ToolTip position="top" tooltip={t('global.restart')}>
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
