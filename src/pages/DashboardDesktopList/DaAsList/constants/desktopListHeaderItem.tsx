import UserFocus from '@iconify-icons/ph/user-focus';
import Trash from '@iconify-icons/ph/trash-simple';
import Play from '@iconify-icons/ph/queue';
import UsersFour from '@iconify-icons/ph/users-four';
import {
  EPermissionDaas,
  EPermissionDaasMetaConfig,
  EPermissionSessionRecording,
} from '@src/types/permissions';
import { HeaderTable } from '@redesignUi/molecules/BaseTable/types';
import { TextCheckHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/TextCheckHelperCell';
import { ActionLockHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/ActionLockHelperCell';
import { ProgressBarHelperCell } from '@redesignUi/molecules/BaseTable/components/HelperCell/ProgressBarHelperCell';

import { AccessTime } from '../AccessTime';
import { AccessTimeSetting } from '../DaAsCard/AccessTimeSetting';

export const desktopListHeaderItem: HeaderTable[] = [
  {
    label: 'table.email',
    id: 'email',
    type: 'avatar',
    email: 'email',
    isActive: 'is_running',
    class: 'w-3/12',
  },
  {
    label: 'table.lastUptime',
    id: 'last_uptime',
    type: 'date',
    class: 'lg:w-1/12 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.accessTime',
    id: 'time_limit_value_in_hour',
    type: 'component',
    isMobileCollapsed: true,
    component: (props: any) => (
      <AccessTime
        time={props.row.daas_configs.time_limit_value_in_hour}
        isPermanent={
          props.row.daas_configs.time_limit_duration === 'PERMANENTLY'
        }
      />
    ),
    class: 'lg:w-1/12 w-2/12',
  },
  {
    label: 'table.setting',
    id: 'daas_configs',
    type: 'component',
    component: (props: any) => (
      <TextCheckHelperCell
        id={props.row.daas_configs.is_globally_config}
        firstCondition="table.defaultSetting"
        secondCondition="table.custom"
      />
    ),
    class: 'lg:w-1/12 w-2/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.userStatus',
    id: 'is_lock',
    type: 'component',
    component: (props: any) => (
      <ActionLockHelperCell
        id={props.row.is_lock}
        row={props.row}
        onClick={props.onClick}
      />
    ),
    permission: EPermissionDaas.CHANGE,
    class: 'w-2/12 lg:w-1/12',
    isMobileCollapsed: true,
  },
  {
    label: 'table.timing',
    id: 'updated_at',
    type: 'component',
    component: (props: any) => (
      <AccessTimeSetting
        timeLimitDuration={props.row.daas_configs.time_limit_duration}
      />
    ),
    class: 'lg:w-1/12 w-2/12',
    permission: EPermissionDaas.CHANGE,
    isMobileCollapsed: true,
  },
  {
    label: 'table.connection',
    id: 'exceeded_usage',
    type: 'component',
    isCollapsed: true,
    component: (props: any) => (
      <TextCheckHelperCell
        id={props.row.exceeded_usage}
        firstCondition="table.allowed"
        secondCondition="table.disallow"
      />
    ),
    class: 'w-1/12',
  },
  {
    label: 'table.httpsPort',
    id: 'https_port',
    type: 'none',
    class: 'w-2/12',
    isCollapsed: true,
  },
  {
    label: 'table.lastLoginIp',
    id: 'last_login_ip',
    type: 'none',
    class: 'w-1/12',
    isCollapsed: true,
  },
  {
    label: 'table.desktopV',
    id: 'daas_version',
    type: 'none',
    class: 'w-2/12',
    isCollapsed: true,
  },

  {
    label: 'table.usedTime',
    id: 'usage_in_minute',
    type: 'component',
    component: (props: any) => (
      <ProgressBarHelperCell
        totalHours={props.row.daas_configs.time_limit_value_in_hour}
        usedMinutes={props.row.usage_in_minute}
        isPermanent={
          props.row.daas_configs.time_limit_duration === 'PERMANENTLY'
        }
      />
    ),
    class: 'w-1/12 mr-auto lg:mr-0',
  },

  {
    id: 'action',
    type: 'menu',
    tooltip: 'table.moreDetail',
    menu: [
      {
        action: 'edit',
        icon: UserFocus,
        color: 'neutralNoBg',
        permission: EPermissionDaasMetaConfig.CHANGE,
        title: 'table.accessSetting',
      },
      {
        action: 'more',
        icon: Play,
        color: 'neutralNoBg',
        permission: EPermissionSessionRecording.VIEW,
        title: 'table.recordingActivity',
      },
      {
        action: 'details',
        icon: UsersFour,
        color: 'neutralNoBg',
        // permission: EPermissionUsers.CHANGE,
        title: 'table.assistance',
      },
      {
        action: 'delete',
        icon: Trash,
        color: 'redNoBg',
        permission: EPermissionDaas.DELETE,
        title: 'table.deleteUser',
      },
    ],
    permission: [
      EPermissionDaasMetaConfig.CHANGE,
      EPermissionDaas.DELETE,
      EPermissionSessionRecording.VIEW,
    ],
    class: 'mr-auto w-2/12 lg:w-1/12',
  },
];
