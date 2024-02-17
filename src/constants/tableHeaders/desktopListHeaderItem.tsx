import gear from '@iconify-icons/ph/gear';
import trashIcon from '@iconify-icons/ph/trash';
import { SetAccessTime } from '@src/pages/DashboardDesktopList/DaAsList/DaAsCard/SetAccessTime';
import { UsedTimeDass } from '@src/pages/DashboardDesktopList/DaAsList/UsedTimeDass';
import { ActionLockCell } from '@ui/atoms/BaseTable/components/CustomCell/ActionLockCell';

import { IHeaderTable } from '@ui/atoms/BaseTable/types';
import { Check } from '@ui/atoms/BaseTable/components/tableIcons/Check';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';

export const desktopListHeaderItem: IHeaderTable[] = [
  {
    label: 'table.email',
    id: 'email',
    type: 'none',
    dir: '',
    style: 'w-40 max-w-full',
    size: 'body4',
  },
  {
    label: 'table.httpPort',
    id: 'http_port',
    type: 'none',
    dir: '',
    style: 'w-32 max-w-full',
    size: 'body4',
  },
  {
    label: 'table.httpsPort',
    id: 'https_port',
    type: 'none',
    style: 'w-32 max-w-full',
    size: 'body4',
  },
  {
    label: 'table.accessCapacity',
    id: 'exceeded_usage',
    type: 'component',
    component: (props: any) => (
      <Check id={!props.row.exceeded_usage} header={props.head} />
    ),
    dir: '',
    style: 'w-40 max-w-full',
    size: 'body4',
  },
  {
    label: 'table.containerId',
    id: 'container_id',
    type: 'tooltip',
    style: 'w-40 max-w-full',
    size: 'body4',
  },
  {
    label: 'table.lastUptime',
    id: 'last_uptime',
    type: 'tooltip',
    style: ' w-40 max-w-full',
    size: 'body4',
  },
  {
    label: 'table.lastLoginIp',
    id: 'last_login_ip',
    type: 'none',
    style: 'w-40 max-w-full',
    size: 'body4',
  },
  {
    label: 'table.status',
    id: 'is_running',
    type: 'component',
    component: (props: any) => <Circle id={props.row.is_running} />,
    style: 'w-32 max-w-full',
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
    style: 'w-32 max-w-full',
    size: 'body4',
  },

  {
    label: 'table.desktopV',
    id: 'daas_version',
    type: 'none',
    dir: '',
    style: 'w-32 max-w-full',
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
    style: 'w-32 max-w-full',
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
    style: 'w-64 max-w-full',
    size: 'body4',
  },

  {
    label: 'table.defaultSetting',
    id: 'daas_configs',
    type: 'component',
    component: (props: any) => (
      <Check
        id={props.row.daas_configs.is_globally_config}
        header={props.head}
      />
    ),
    style: 'w-32 max-w-full',
    size: 'body4',
  },

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
    style: 'w-32 max-w-full',
    size: 'body4',
  },
];
