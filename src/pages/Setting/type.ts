import { Control } from 'react-hook-form';

import { ETimeLimitDuration } from '@src/services/users/types';
import { PermissionsCodeName } from '@src/types/permissions';

export interface ApplicationSettingProp {
  id?: number | null;
  keycloak_base_url: string;
  keycloak_port: string;
  keycloak_ssl: boolean;
  keycloak_client_id: string;
  keycloak_secret: string;
  keycloak_realm: string;
  daas_provider_baseurl: string;
  log_server_ip: string;
  log_server_port: number;
}

export interface DaasSettingProp {
  id?: string;
  can_upload_file: boolean;
  can_download_file: boolean;
  clipboard_up: boolean;
  clipboard_down: boolean;
  webcam_privilege: boolean;
  microphone_privilege: boolean;
  is_recording: boolean;
  has_evidence_gathering?: boolean;
  has_clipboard_access?: boolean;
  has_clipboard_log?: boolean;
  time_limit_duration: ETimeLimitDuration;
  time_limit_value_in_hour: null | number;
  max_transmission_upload_size: number;
  max_transmission_download_size: number;
  is_globally_config: boolean;
  has_online_assistance?: boolean;
  has_clipboard_log_access?: boolean;
}

export interface PropsType {
  control: Control<any>;
  userPermissions: PermissionsCodeName[];
  dir?: 'rtl' | 'ltr';
  isActive: string;
}
export interface FileTypeProp {
  id: number;
  file_type: string;
  allowed_for_upload: boolean;
  allowed_for_download: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  upload_file_size_mb: number;
  download_file_size_mb: number;
}
