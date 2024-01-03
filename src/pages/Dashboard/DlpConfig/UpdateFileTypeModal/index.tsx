import { BaseButton } from '@ui/atoms/BaseButton';
import { BaseInput, Typography } from '@ui/atoms';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { IFileType } from '@src/services/config/types';
import { BaseSwitch } from '@ui/atoms/Inputs/BaseSwitch';
import { regexPattern } from '@ui/atoms/Inputs';
import { API_CREATE_FILE_TYPE, API_UPDATE_FILE_TYPE } from '@src/services/config';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

type PropsType = {
	handleClose: (isUpdated?: boolean) => void;
	fileType?: Partial<IFileType>;
};

export function UpdateFileTypeModal({ handleClose, fileType }: PropsType) {
	const { t } = useTranslation();
	const [showConfirm, setShowConfirm] = useState(false);
	const [loadingButtonModal, setLoadingButtonModal] = useState(false);

	const { control, handleSubmit } = useForm<IFileType>({
		mode: 'onChange',
		defaultValues: {
			id: fileType?.id,
			file_type: fileType?.file_type,
			allowed_for_download: fileType?.allowed_for_download ?? false,
			allowed_for_upload: fileType?.allowed_for_upload ?? false,
			is_active: fileType?.is_active ?? false,
		},
	});

	const handleOnSubmit = async (data: IFileType) => {
		setLoadingButtonModal(true);

		if (data.id) {
			await API_UPDATE_FILE_TYPE(data as IFileType)
				.then(() => {
					toast.success(t('global.sucessfulyUpdated'));
					handleClose(true);
				})
				.catch((err) => {
					toast.error(err);
				})
				.finally(() => {
					setLoadingButtonModal(false);
				});
			return;
		}

		await API_CREATE_FILE_TYPE(data)
			.then(() => {
				toast.success(t('global.successfullyAdded'));
				handleClose(true);
			})
			.catch((err) => {
				toast.error(err);
			})
			.finally(() => {
				setLoadingButtonModal(false);
			});
	};

	return (
		<form
			className="w-full h-full grid grid-cols-6 gap-8 p-4"
			onSubmit={handleSubmit(handleOnSubmit)}>
			<div className="px-2 col-span-6 flex justify-between items-start">
				<div className="w-1/3 flex justify-between items-center mt-2">
					<BaseSwitch control={control} name="is_active" />
					<Typography className="mb-1">:Is Active</Typography>
				</div>
				<BaseInput
					control={control}
					name="file_type"
					id="file_type"
					placeholder=".txt"
					size="none"
					maxLength={10}
					ltrLabel
					rules={{
						pattern: regexPattern.wordStartedWithPointAndEn,
						required: regexPattern.required,
					}}
				/>
			</div>
			<div className="px-2 col-span-6 flex justify-between items-start">
				<div className="w-1/3 flex justify-between items-center">
					<BaseSwitch control={control} name="allowed_for_download" />
					<Typography className="mb-1">:Allowed For Download</Typography>
				</div>

				<div className="w-1/3 flex justify-between items-center">
					<BaseSwitch control={control} name="allowed_for_upload" />
					<Typography className="mb-1">:Allowed For Upload</Typography>
				</div>
			</div>

			<div className="flex justify-center col-span-6">
				{showConfirm && (
					<div className="flex justify-center items-center w-full">
						<Typography className="mx-2">{t('global.areYouSure')}</Typography>
						<BaseButton
							label={t('global.yes')}
							size="sm"
							submit
							className="mx-2"
							loading={loadingButtonModal}
						/>
						<BaseButton
							label={t('global.no')}
							size="sm"
							type="red"
							className="mx-2"
							onClick={() => setShowConfirm(false)}
						/>
					</div>
				)}

				{!showConfirm && (
					<BaseButton label={t('global.confirm')} size="md" onClick={() => setShowConfirm(true)} />
				)}
			</div>
		</form>
	);
}
