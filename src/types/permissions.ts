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
}

// export type PermissionsCodeName = `${PermissionAction}_${PermissionResource}`;
export enum EPermissionKeycloak {
  ADD = 'add_keycloak', // without usage
  CHANGE = 'change_keycloak',
  DELETE = 'delete_keycloak', // without usage
  VIEW = 'view_keycloak',
}
export enum EPermissionFileScan {
  ADD = 'add_file_scan', // without usage
  CHANGE = 'change_file_scan',
  DELETE = 'delete_file_scan', // without usage
  VIEW = 'view_file_scan',
}
export enum EPermissionExtensions {
  ADD = 'add_extensions', // without usage
  CHANGE = 'change_extensions',
  DELETE = 'delete_extensions', // without usage
  VIEW = 'view_extensions',
}
export enum EPermissionUba {
  ADD = 'add_uba', // without usage
  CHANGE = 'change_uba',
  DELETE = 'delete_uba', // without usage
  VIEW = 'view_uba',
}
export enum EPermissionScanReports {
  ADD = 'add_scan_reports', // without usage
  CHANGE = 'change_scan_reports',
  DELETE = 'delete_scan_reports', // without usage
  VIEW = 'view_scan_reports',
}
export enum EPermissionInternetLogs {
  ADD = 'add_internet_logs', // without usage
  CHANGE = 'change_internet_logs',
  DELETE = 'delete_internet_logs', // without usage
  VIEW = 'view_internet_logs',
}
export enum EPermissionSessionRecording {
  ADD = 'add_session_recording', // without usage
  CHANGE = 'change_session_recording',
  DELETE = 'delete_session_recording', // without usage
  VIEW = 'view_session_recording',
}
export enum EPermissionConfig {
  ADD = 'add_config', // without usage
  CHANGE = 'change_config',
  DELETE = 'delete_config', // without usage
  VIEW = 'view_config',
}
export enum EPermissionDaasMetaConfig {
  CHANGE = 'change_daasmetaconfig',
  DELETE = 'delete_daasmetaconfig', // without usage
  VIEW = 'view_daasmetaconfig',
  ADD = 'add_daasmetaconfig',
}
export enum EPermissionWhiteListFiles {
  CHANGE = 'change_whitelistfiles',
  DELETE = 'delete_whitelistfiles',
  VIEW = 'view_whitelistfiles',
  ADD = 'add_whitelistfiles',
}
export enum EPermissionDaas {
  CHANGE = 'change_daas',
  DELETE = 'delete_daas',
  VIEW = 'view_daas',
  ADD = 'add_daas',
}
export enum EPermissionUsers {
  CHANGE = 'change_users',
  DELETE = 'delete_users',
  VIEW = 'view_users',
  ADD = 'add_users',
}

export enum EPermissionMalware {
  CHANGE = 'change_malware',
  DELETE = 'delete_malware',
  VIEW = 'view_malware',
  ADD = 'add_malware',
}

export type PermissionsCodeName =
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
  | EPermissionMalware
  | EPermissionUsers;

type TContentTypePermission = {
  id: number;
  app_label: string;
  model: string;
};

export interface IUserPermissions {
  id: number;
  content_type: TContentTypePermission;
  name: string;
  codename: PermissionsCodeName;
}

// const userPermissions: IUserPermissions[] = [
//   {
//     id: 53,
//     content_type: {
//       id: 14,
//       app_label: 'config',
//       model: 'config',
//     },
//     name: 'Can add config',
//     codename: 'add_config',
//   },
//   {
//     id: 54,
//     content_type: {
//       id: 14,
//       app_label: 'config',
//       model: 'config',
//     },
//     name: 'Can change config',
//     codename: 'change_config',
//   },
//   {
//     id: 55,
//     content_type: {
//       id: 14,
//       app_label: 'config',
//       model: 'config',
//     },
//     name: 'Can delete config',
//     codename: 'delete_config',
//   },
//   {
//     id: 56,
//     content_type: {
//       id: 14,
//       app_label: 'config',
//       model: 'config',
//     },
//     name: 'Can view config',
//     codename: 'view_config',
//   },
//   {
//     id: 57,
//     content_type: {
//       id: 15,
//       app_label: 'config',
//       model: 'daasmetaconfig',
//     },
//     name: 'Can add daas meta config',
//     codename: 'add_daasmetaconfig',
//   },
//   {
//     id: 58,
//     content_type: {
//       id: 15,
//       app_label: 'config',
//       model: 'daasmetaconfig',
//     },
//     name: 'Can change daas meta config',
//     codename: 'change_daasmetaconfig',
//   },
//   {
//     id: 59,
//     content_type: {
//       id: 15,
//       app_label: 'config',
//       model: 'daasmetaconfig',
//     },
//     name: 'Can delete daas meta config',
//     codename: 'delete_daasmetaconfig',
//   },
//   {
//     id: 60,
//     content_type: {
//       id: 15,
//       app_label: 'config',
//       model: 'daasmetaconfig',
//     },
//     name: 'Can view daas meta config',
//     codename: 'view_daasmetaconfig',
//   },
//   {
//     id: 61,
//     content_type: {
//       id: 16,
//       app_label: 'config',
//       model: 'whitelistfiles',
//     },
//     name: 'Can add white list files',
//     codename: 'add_whitelistfiles',
//   },
//   {
//     id: 62,
//     content_type: {
//       id: 16,
//       app_label: 'config',
//       model: 'whitelistfiles',
//     },
//     name: 'Can change white list files',
//     codename: 'change_whitelistfiles',
//   },
//   {
//     id: 63,
//     content_type: {
//       id: 16,
//       app_label: 'config',
//       model: 'whitelistfiles',
//     },
//     name: 'Can delete white list files',
//     codename: 'delete_whitelistfiles',
//   },
//   {
//     id: 64,
//     content_type: {
//       id: 16,
//       app_label: 'config',
//       model: 'whitelistfiles',
//     },
//     name: 'Can view white list files',
//     codename: 'view_whitelistfiles',
//   },
//   {
//     id: 65,
//     content_type: {
//       id: 17,
//       app_label: 'users',
//       model: 'daas',
//     },
//     name: 'Can add daas',
//     codename: 'add_daas',
//   },
//   {
//     id: 66,
//     content_type: {
//       id: 17,
//       app_label: 'users',
//       model: 'daas',
//     },
//     name: 'Can change daas',
//     codename: 'change_daas',
//   },
//   {
//     id: 67,
//     content_type: {
//       id: 17,
//       app_label: 'users',
//       model: 'daas',
//     },
//     name: 'Can delete daas',
//     codename: 'delete_daas',
//   },
//   {
//     id: 68,
//     content_type: {
//       id: 17,
//       app_label: 'users',
//       model: 'daas',
//     },
//     name: 'Can view daas',
//     codename: 'view_daas',
//   },
//   {
//     id: 69,
//     content_type: {
//       id: 18,
//       app_label: 'users',
//       model: 'users',
//     },
//     name: 'Can add user',
//     codename: 'add_users',
//   },
//   {
//     id: 70,
//     content_type: {
//       id: 18,
//       app_label: 'users',
//       model: 'users',
//     },
//     name: 'Can change user',
//     codename: 'change_users',
//   },
//   {
//     id: 71,
//     content_type: {
//       id: 18,
//       app_label: 'users',
//       model: 'users',
//     },
//     name: 'Can delete user',
//     codename: 'delete_users',
//   },
//   {
//     id: 72,
//     content_type: {
//       id: 18,
//       app_label: 'users',
//       model: 'users',
//     },
//     name: 'Can view user',
//     codename: 'view_users',
//   },
// ];
