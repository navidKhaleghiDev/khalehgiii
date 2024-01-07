import moreIcon from '@iconify-icons/ph/dots-three-outline-fill';
import { ROUTES_PATH } from '@src/routes/routesConstants';
import { CircleBGBorder } from '@ui/atoms/BaseTable/CicleBGBorder';

export function scannedFileHeaderItem() {
	return [
		{
			label: 'table.fileName',
			id: 'file_name',
			type: 'none',
			dir: '',
			style: 'px-3 w-3/12 font-bold',
			size: 'body4',
		},
		{
			label: 'table.type',
			id: 'file_content_type',
			type: 'none',
			dir: '',
			style: 'px-3 w-3/12',
			size: 'body4',
		},
		{
			label: 'table.resultScanerStatus',
			id: 'yara_scanner_status',
			type: 'component',
			component: (props: any) => <CircleBGBorder results={props.row.yara_scan_result} {...props} />,
			dir: '',
			style: 'px-3 w-2/12',
			size: 'body4',
		},
		{
			label: 'table.resultScanerStatus',
			id: 'clamav_scanner_status',
			type: 'component',
			component: (props: any) => (
				<CircleBGBorder results={props.row.clamav_scan_result} {...props} />
			),
			dir: '',
			style: 'px-3 w-2/12',
			size: 'body4',
		},
		{
			label: 'table.resultScanerStatus',
			id: 'antiviruses_scanner_status',
			type: 'component',
			component: (props: any) => (
				<CircleBGBorder results={props.row.antiviruses_scan_result} {...props} />
			),
			dir: '',
			style: 'px-3 w-2/12',
			size: 'body4',
		},
		{
			label: 'table.moreDetail',
			id: 'is_running',
			type: 'action',
			action: [
				{
					action: ROUTES_PATH.monitoring,
					icon: moreIcon,
					color: 'neutralNoBg',
					style: '',
				},
			],
			dir: '',
			style: 'px-3 w-2/12',
			size: 'body4',
		},
	];
}
