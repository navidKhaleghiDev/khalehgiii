export enum PermissionAction {
  ADD = 'add',
  CHANGE = 'change',
  DELETE = 'delete',
  VIEW = 'view',
}

export enum PermissionResource {
  CONFIG = 'config',
  DAAS_META_CONFIG = 'daasmetaconfig',
  WHITE_LIST_FILES = 'whitelistfiles',
  DAAS = 'daas',
  USERS = 'users',
  KEYCLOAK = 'keycloak',
  FILE_SCAN = 'file_scan',
  EXTENSIONS = 'extensions',
  UBA = 'uba',
  SCAN_REPORTS = 'scan_reports',
  INTERNET_LOGS = 'internet_logs',
  SESSION_RECORDING = 'session_recording',
  GROUP_MANAGEMENT = 'customgroup',
}

// export type PermissionsCodeName = `${PermissionAction}_${PermissionResource}`;
export enum EPermissionKeycloak {
  ADD = 'add_keycloak', // without usage
  CHANGE = 'change_keycloak', // without usage
  DELETE = 'delete_keycloak', // without usage
  VIEW = 'view_keycloak', // کارت تو دسکتاپ .
}
export enum EPermissionFileScan {
  ADD = 'add_file_scan', // without usage
  CHANGE = 'change_file_scan', // without usage
  DELETE = 'delete_file_scan', // without usage
  VIEW = 'view_file_scan', // cart in dashboard , rout monitoring , table montoring,
}
export enum EPermissionExtensions {
  ADD = 'add_extensions',
  // plus icon , modal add
  CHANGE = 'change_extensions',
  // without usage
  DELETE = 'delete_extensions',
  // delete icon in table
  VIEW = 'view_extensions',
  // card extension dashboard , route extension-list , table
}
export enum EPermissionUba {
  ADD = 'add_uba', // without usage
  CHANGE = 'change_uba', // without usage
  DELETE = 'delete_uba', // without usage
  VIEW = 'view_uba', // card uba dashboard, route dashboard/uba
}
export enum EPermissionScanReports {
  ADD = 'add_scan_reports', // without usage
  CHANGE = 'change_scan_reports', // without usage
  DELETE = 'delete_scan_reports', // without usage
  VIEW = 'view_scan_reports', // route dashboard/reports , card reports in dashboard,
}
export enum EPermissionInternetLogs {
  ADD = 'add_internet_logs', // without usage
  CHANGE = 'change_internet_logs', // without usage
  DELETE = 'delete_internet_logs', // without usage
  VIEW = 'view_internet_logs', // card internet in dashboard, route dashboard/internet-log,
}
export enum EPermissionSessionRecording {
  ADD = 'add_session_recording', // without usage
  CHANGE = 'change_session_recording', // in table desktop-list and icon setting , ضبط دسکتاپ switch
  DELETE = 'delete_session_recording', // without usage
  VIEW = 'view_session_recording', // icon in table of dashboard/desktop-list , route dashboard/desktop-list/session-recording/:id831b485c-78ef-4765-8c86-c2cc1cf7ebb8 , tab ,
}
export enum EPermissionConfig {
  ADD = 'add_config', // as first time , when (application) no data
  CHANGE = 'change_config', // settings tab (application)
  DELETE = 'delete_config', // without usage
  VIEW = 'view_config', // settings tab (application)
}
export enum EPermissionDaasMetaConfig {
  CHANGE = 'change_daasmetaconfig', // in table desktop-list and icon setting, card list desktop in dashboard (icon edit in access setting )
  DELETE = 'delete_daasmetaconfig', // no usage
  VIEW = 'view_daasmetaconfig', // in table desktop-list and icon setting ,other setting except ضبط دسکتاپ switch
  ADD = 'add_daasmetaconfig', // no add
}
export enum EPermissionWhiteListFiles {
  CHANGE = 'change_whitelistfiles', // desktop list setting modal, download and upload format , icon close , icon plus, // dlp tap in dashboard, modal setting icon (all ) , icon change
  DELETE = 'delete_whitelistfiles', // dlp tap in dashboard, modal setting icon (all ) , icon delete ,
  VIEW = 'view_whitelistfiles', // desktop list setting modal, download and upload format , dlp tap in dashboard, modal setting icon (all )
  ADD = 'add_whitelistfiles', // dlp tap in dashboard, modal setting icon (all ) , icon plus
}
export enum EPermissionDaas {
  CHANGE = 'change_daas', // card list desktop in dashboard (icon lock , reset usage icon  )
  DELETE = 'delete_daas', // card list desktop in dashboard (icon delete)
  VIEW = 'view_daas', // card list desktop in dashboard , table and route of list desktop
  ADD = 'add_daas', // no usage
}
export enum EPermissionUsers {
  CHANGE = 'change_users', // in route , modal edit icon and edit icon
  DELETE = 'delete_users', // icon delete in table
  VIEW = 'view_users', // card admin list in dashboard, route dashboard/admins-list , table
  ADD = 'add_users', // plus icon in route , modal ,
}

export enum EPermissionMalwareConfig {
  CHANGE = 'change_malware_config', // tab malware in dashboard,
  DELETE = 'delete_malware_config', // no usage
  VIEW = 'view_malware_config', // tab malware in dashboard,
  ADD = 'add_malware_config', // if log server and log server port is empty
}
export enum EPermissionGroupManagement {
  CHANGE = 'change_customgroup',
  DELETE = 'delete_customgroup',
  VIEW = 'view_customgroup',
  ADD = 'add_customgroup',
}

export type PermissionsCodeName =
  | EPermissionGroupManagement
  | EPermissionKeycloak
  | EPermissionFileScan
  | EPermissionExtensions
  | EPermissionUba
  | EPermissionScanReports
  | EPermissionInternetLogs
  | EPermissionSessionRecording
  | EPermissionConfig
  | EPermissionDaasMetaConfig
  | EPermissionWhiteListFiles
  | EPermissionDaas
  | EPermissionMalwareConfig
  | EPermissionUsers;

type TContentTypePermission = {
  id: number;
  app_label: string;
  model: string;
};

export interface IUserPermissions {
  selected: boolean;
  id: number;
  content_type: TContentTypePermission;
  name: string;
  codename: PermissionsCodeName;
}
// {
//   "id": 85,
//   "name": "Can view uba",
//   "codename": "view_uba",
//   "content_type": 23
// },
