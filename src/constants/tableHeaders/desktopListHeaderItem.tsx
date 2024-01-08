import { dateAndNumber } from '@src/helper/utils/dateUtils';
import lockKeyFillIcon from '@iconify-icons/ph/lock-key-fill';
import lockKeyOpenFillIcon from '@iconify-icons/ph/lock-key-open-fill';
import gear from '@iconify-icons/ph/gear';
import trashIcon from '@iconify-icons/ph/trash';
import { SetAccessTime } from '@src/pages/DashboardDesktopList/DaAsList/DaAsCard/SetAccessTime';

export const desktopListHeaderItem = [
	{
		label: 'table.accessSetting',
		id: 'can_upload_file',
		type: 'action',
    action: [
      {
        action: 'delete',
        icon: trashIcon,
        color: 'redNoBg',
        style: '',
      },
      {
        action: 'edit',
        icon: gear,
        color: 'neutralNoBg',
        style: '',
      },
    ],

		dir: '',
		style: 'px-3 w-2/12',
    size:"body4"
	},
	{
		label: 'table.accessSettingsTime',
		id: 'updated_at',
		type: 'component',
    component:
    (props: any) => (
      <SetAccessTime
        id={props.id as string}
        {...props}
        timeLimitValue={props.row.daas_configs.time_limit_value_in_hour || 0}
        timeLimitDuration={props.row.daas_configs.time_limit_duration}
      />
    ),

		
		dir: 'rtl',
		style: 'px-3 w-2/12',
    size:"body4"
	},
	{
		label: 'table.usedTime',
		id: 'usage_in_minute',
		type: 'none',
		dir: '',
		style: 'px-3 w-2/12',
    size:"body4"
	},
	{
		label: 'table.desktop',
		id: 'file_names',
		type: 'none',
		dir: '',
		style: 'px-3 w-2/12',
    size:"body4"
	},
	{
		label: 'table.desktopV',
		id: 'daas_version',
		type: 'none',
		dir: '',
		style: 'px-3 w-2/12',
    size:"body4"
	},
	{
		label: 'table.status',
		id: 'is_ban',
		type: 'icon',
		icon: [lockKeyFillIcon, lockKeyOpenFillIcon],
		dir: '',
		style: 'px-3 w-2/12',
    size:"body4"
	},
	{
		label: 'table.defaultSetting',
		id: 'transmission_type',
		type: 'none',
		dir: '',
		style: 'px-3 w-2/12',
    size:"body4"
	},
];
