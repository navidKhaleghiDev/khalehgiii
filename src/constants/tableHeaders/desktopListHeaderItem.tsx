import gear from '@iconify-icons/ph/gear';
import trashIcon from '@iconify-icons/ph/trash';
import { SetAccessTime } from '@src/pages/DashboardDesktopList/DaAsList/DaAsCard/SetAccessTime';
import { UsedTimeDass } from '@src/pages/DashboardDesktopList/DaAsList/UsedTimeDass';
import { ActionLockCell } from '@ui/atoms/BaseTable/BaseTableComponents/ActionLockCell';
import { CircleBg } from '@ui/atoms/CircleBg';
import { CheckCell } from '@ui/atoms/BaseTable/BaseTableComponents/CheckCell';
import { HeaderItem } from '@ui/atoms/BaseTable/BaseTableTypes';

export const desktopListHeaderItem: HeaderItem[] = [
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
    size: 'body4',
  },
  {
    label: 'table.accessSettingsTime',
    id: 'updated_at',
    type: 'component',
    component: (props: any) => (
      <SetAccessTime
        id={props.row.id as string}
        onClickActions={props.onClick}
        timeLimitValue={props.row.daas_configs.time_limit_value_in_hour || 0}
        timeLimitDuration={props.row.daas_configs.time_limit_duration}
      />
    ),

    dir: 'rtl',
    style: 'px-3 w-4/12',
    size: 'body4',
  },
  {
    label: 'table.usedTime',
    id: 'usage_in_minute',
    type: 'component',
    component: (props: any) => (
      <UsedTimeDass time={props.row.usage_in_minute} />
    ),
    dir: '',
    style: 'px-3 w-3/12',
    size: 'body4',
  },
  {
    label: 'table.desktop',
    id: 'is_lock',
    type: 'component',
    component: (props: any) => (
      <ActionLockCell
        id={props.row.is_lock}
        row={props.row}
        onClick={props.onClick}
      />
    ),

    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.desktopV',
    id: 'daas_version',
    type: 'none',
    dir: '',
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.status',
    id: 'is_running',
    type: 'icon',
    icon: CircleBg,
    color: ['bg-teal-600', 'bg-gray-400'],
    style: 'px-3 w-1/12',
    size: 'body4',
  },
  {
    label: 'table.defaultSetting',
    id: 'daas_configs',
    type: 'component',
    component: (props: any) => (
      <CheckCell
        id={props.row.daas_configs.is_globally_config}
        head={props.head}
      />
    ),
    style: 'px-3 w-2/12',
    size: 'body4',
  },
  {
    label: 'table.email',
    id: 'email',
    type: 'none',
    style: 'px-3 w-3/12',
    size: 'body4',
  },
];
