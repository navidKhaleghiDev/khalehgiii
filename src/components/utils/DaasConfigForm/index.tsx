import { BaseSwitch } from '@ui/atoms/Inputs/BaseSwitch';
import { BaseInput, Typography } from '@ui/atoms';
import { Control } from 'react-hook-form';
import { Dropdown } from '@ui/atoms/DropDown';
import { regexPattern } from '@ui/atoms/Inputs';
import { timeLimitDurationOptions } from '@src/pages/DashboardDesktopList/DaAsList/DaAsCard/SetAccessTime';
import { useTranslation } from 'react-i18next';

type PropsType = {
	control: Control<any>;
};

export function DaasConfigForm({ control }: PropsType) {
	const { t } = useTranslation();
	return (
		<>
			<div className="flex justify-between items-center px-2 col-span-3">
				<BaseSwitch control={control} name="can_download_file" />
				<Typography className="mb-1">:Download</Typography>
			</div>

			<div className="flex justify-between items-center px-2 col-span-3">
				<BaseSwitch control={control} name="can_upload_file" />
				<Typography className="mb-1">:Upload</Typography>
			</div>

			<div className="flex justify-between items-center px-2 col-span-3">
				<BaseSwitch control={control} name="clipboard_down" />
				<Typography className="mb-1">:Clipboard from Server</Typography>
			</div>

			<div className="flex justify-between items-center px-2 col-span-3">
				<BaseSwitch control={control} name="clipboard_up" />
				<Typography className="mb-1">:Clipboard from Client</Typography>
			</div>

			<div className="flex justify-between items-center px-2 col-span-3">
				<BaseSwitch control={control} name="webcam_privilege" />
				<Typography className="mb-1">:Webcam Privilege</Typography>
			</div>

			<div className="flex justify-between items-center px-2 col-span-3">
				<BaseSwitch control={control} name="microphone_privilege" />
				<Typography className="mb-1">:Microphone Privilege</Typography>
			</div>

			<div className="px-2 col-span-3 text-left">
				<Typography className="mb-1">:Time Limit Duration</Typography>
				<Dropdown
					control={control}
					id="time_limit_duration"
					name="time_limit_duration"
					options={timeLimitDurationOptions}
					placeHolder={t('global.select')}
					containerClassName="col-span-6 xl:col-span-3"
					rules={{
						required: regexPattern.required,
					}}
					fullWidth
					hiddenError
				/>
			</div>

			<div className="px-2 col-span-3 text-left">
				<Typography className="mb-1">:Time Limit Value In Hour</Typography>
				<BaseInput
					control={control}
					// size="xs"
					id="time_limit_value_in_hour"
					name="time_limit_value_in_hour"
					placeholder={t('global.selectHour')}
					className="col-span-6 lg:col-span-4"
					rules={{
						pattern: regexPattern.numbers,
					}}
					type="number"
					fullWidth
					hiddenError
				/>
			</div>
			<div className="px-2 col-span-3 text-left">
				<Typography className="mb-1">:Max Download Size (MB)</Typography>
				<BaseInput
					control={control}
					name="max_transmission_download_size"
					id="max_transmission_download_size"
					type="number"
					hiddenError
					fullWidth
				/>
			</div>
			<div className="px-2 col-span-3 text-left">
				<Typography className="mb-1">:Max Upload Size (MB)</Typography>
				<BaseInput
					control={control}
					name="max_transmission_upload_size"
					id="max_transmission_upload_size"
					type="number"
					hiddenError
					fullWidth
				/>
			</div>
		</>
	);
}
