import gear from '@iconify-icons/ph/gear';
import trashIcon from '@iconify-icons/ph/trash';
import { SetAccessTime } from '@src/pages/DashboardDesktopList/DaAsList/DaAsCard/SetAccessTime';
import { UsedTimeDass } from '@src/pages/DashboardDesktopList/DaAsList/UsedTimeDass';
import { ActionLockCell } from '@ui/atoms/BaseTable/components/CustomCell/ActionLockCell';

import { Check } from '@ui/atoms/BaseTable/components/tableIcons/Check';
import { Circle } from '@ui/atoms/BaseTable/components/tableIcons/Circle';
import PhListBulletsFill from '@iconify-icons/ph/list-bullets-fill';
import PhListMagnifyingGlassDuotone from '@iconify-icons/ph/list-magnifying-glass-duotone';
import {
  EPermissionDaas,
  EPermissionDaasMetaConfig,
  EPermissionSessionRecording,
} from '@src/types/permissions';
import { IHeaderTable } from '@redesignUi/molecules/BaseTable/types';

export const desktopListHeaderItem: IHeaderTable[] = [
  {
    label: 'table.email',
    id: 'email',
    type: 'none',
    class: 'w-2/12',
  },
  {
    label: 'table.httpPort',
    id: 'http_port',
    type: 'none',
    class: `w-2/12  `,
    isMobileCollapsed: true,
  },
  {
    label: 'table.httpsPort',
    id: 'https_port',
    type: 'none',
    class: 'w-2/12 ',
    isMobileCollapsed: true,
  },
  {
    label: 'table.accessCapacity',
    id: 'exceeded_usage',
    type: 'component',
    component: (props: any) => (
      <Check id={!props.row.exceeded_usage} header={props.head} />
    ),
    class: 'w-1/12 ',
    isMobileCollapsed: true,
  },
  {
    label: 'table.containerId',
    id: 'container_id',
    type: 'none',
    class: 'w-1/12 ',
    isMobileCollapsed: true,
  },
  {
    label: 'table.lastUptime',
    id: 'last_uptime',
    type: 'none',
    class: ' w-1/12 ',
    isMobileCollapsed: true,
  },
  {
    label: 'table.lastLoginIp',
    id: 'last_login_ip',
    type: 'none',
    class: 'w-1/12 ',
    isCollapsed: true,
  },
  {
    label: 'table.status',
    id: 'is_running',
    type: 'component',
    component: (props: any) => <Circle id={props.row.is_running} />,
    class: 'w-2/12 ',
    isCollapsed: true,
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
    permission: EPermissionDaas.CHANGE,
    class: 'w-2/12 ',
    isCollapsed: true,
  },
  {
    label: 'table.desktopV',
    id: 'daas_version',
    type: 'none',
    class: 'w-2/12 ',
    isCollapsed: true,
  },

  {
    label: 'table.usedTime',
    id: 'usage_in_minute',
    type: 'component',
    component: (props: any) => (
      <UsedTimeDass time={props.row.usage_in_minute} />
    ),
    class: 'w-2/12 ',
    isCollapsed: true,
  },
  // {
  //   label: 'table.accessSettingsTime',
  //   id: 'updated_at',
  //   type: 'component',
  //   component: (props: any) => (
  //     <SetAccessTime
  //       id={props.row.id as string}
  //       onClickActions={props.onClick}
  //       timeLimitValue={props.row.daas_configs.time_limit_value_in_hour || 0}
  //       timeLimitDuration={props.row.daas_configs.time_limit_duration}
  //     />
  //   ),
  //   class: 'w-3/12 ',
  //   isCollapsed: true,
  //   permission: EPermissionDaas.CHANGE,
  // },

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
    class: 'w-2/12 ',
    isCollapsed: true,
  },
  {
    label: 'table.recordingActivity',
    id: 'id',
    type: 'action',
    action: [
      {
        action: 'more',
        icon: PhListBulletsFill,
        color: 'neutralNoBg',
        tooltip: 'table.recordingActivity',
      },
    ],
    permission: EPermissionSessionRecording.VIEW,
    class: 'w-2/12',
    isCollapsed: true,
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
        tooltip: 'table.delete',
        permission: EPermissionDaas.DELETE,
      },
      {
        action: 'edit',
        icon: gear,
        color: 'neutralNoBg',
        tooltip: 'table.edit',
        permission: EPermissionDaasMetaConfig.CHANGE,
      },
    ],
    permission: [EPermissionDaasMetaConfig.CHANGE, EPermissionDaas.DELETE],
    class: 'w-2/12 ',
    isMobileCollapsed: true,
  },
  {
    label: 'global.onlineAssistanceDetail',
    id: 'member_of',
    type: 'action',
    action: [
      {
        action: 'details',
        icon: PhListMagnifyingGlassDuotone,
        color: 'neutralNoBg',
        tooltip: 'global.onlineAssistanceDetail',
      },
    ],
    class: 'w-2/12 ',
    isMobileCollapsed: true,
  },
];
