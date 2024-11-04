import { t } from 'i18next';

import PhHouseSimpleDuotone from '@iconify-icons/ph/house-simple-duotone';
import PhUsersThreeDuotone from '@iconify-icons/ph/users-three-duotone';
import PhBrowsersDuotone from '@iconify-icons/ph/browsers-duotone';
import PhRowsDuotone from '@iconify-icons/ph/rows-duotone';
import PhGearSixDuotone from '@iconify-icons/ph/gear-six-duotone';
import PhChartBarDuotone from '@iconify-icons/ph/chart-bar-duotone';

import { ROUTES_PATH } from '@src/routes/routesConstants';
import { NavigationProps } from './types';

export const navigationSideBar: NavigationProps[] = [
  {
    id: '1',
    label: t('global.home'),
    path: ROUTES_PATH.dashboard,
    icon: PhHouseSimpleDuotone,
  },
  {
    id: '2',
    label: t('global.userManagement'),
    path: '#',
    icon: PhUsersThreeDuotone,
    items: [
      {
        id: '1',
        label: t('groupManagement.label'),
        path: ROUTES_PATH.dashboardGroupManagement,
      },
      {
        id: '2',
        label: t('dashboard.adminLists'),
        path: ROUTES_PATH.dashboardAdminsList,
      },
      {
        id: '3',
        label: t('dashboard.usersLists'),
        path: ROUTES_PATH.dashboardDesktopList,
      },
    ],
  },
  {
    id: '3',
    label: t('global.reportsFile'),
    path: '#',
    icon: PhBrowsersDuotone,
    items: [
      {
        id: '1',
        label: t('dashboard.fileScanReports'),
        path: ROUTES_PATH.reportsScanFile,
      },
      {
        id: '2',
        label: t('global.knowledgeManagement'),
        path: ROUTES_PATH.knowledgeManagement,
      },
      {
        id: '3',
        label: t('dashboard.uba'),
        path: ROUTES_PATH.uba,
      },
    ],
  },
  {
    id: '4',
    label: t('global.systemStrategy'),
    path: '#',
    icon: PhRowsDuotone,
    items: [
      {
        id: '1',
        label: t('dashboard.extentions'),
        path: ROUTES_PATH.extensionList,
      },
      {
        id: '2',
        label: t('global.internetLog'),
        path: ROUTES_PATH.internetLog,
      },
      {
        id: '3',
        label: t('license.licenses'),
        path: ROUTES_PATH.dashboard,
      },
    ],
  },

  {
    id: '5',
    label: t('table.defaultSetting'),
    path: '#',
    icon: PhGearSixDuotone,
    items: [
      {
        id: '1',
        label: t('setting.daas'),
        path: ROUTES_PATH.daas,
      },
      {
        id: '2',
        label: t('setting.application'),
        path: ROUTES_PATH.application,
      },
      {
        id: '3',
        label: 'DLP',
        path: ROUTES_PATH.dlp,
      },
    ],
  },
  {
    id: '6',
    label: t('global.progressingChart'),
    path: ROUTES_PATH.chart,
    icon: PhChartBarDuotone,
  },
];
