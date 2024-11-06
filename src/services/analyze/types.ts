export enum EScannerStatus {
  FINISHED = 'FINISHED',
  IN_PROCESS = 'IN_PROCESS',
  FAILED = 'FAILED',
}

export interface IScannedFile {
  id: number;
  file_name: string;
  file_size_in_bytes: number;
  file_content_type: string;
  username: string;
  yara_scanner_status: EScannerStatus;
  clamav_scanner_status: EScannerStatus;
  yara_scan_summary: string | null;
  yara_scan_result: boolean;
  yara_error_message: string | null;
  clamav_scan_summary: string | null;
  clamav_scan_result: boolean;
  antiviruses_scan_result: boolean;
  antiviruses_scanner_status: EScannerStatus;
  antiviruses_scan_sandbox_summary: string | null;
  antiviruses_scan_vendors_summary: string | null;
  antiviruses_last_analysis_stats: string | null;
  antiviruses_crowdsourced_ids_results: string | null;
  antiviruses_error_message: string | null;
  clamav_error_message: string | null;
  created_at: string;
  evidence_permission: boolean;
  scan_result: string;
  antiviruses_status_code: null;
  downloadable_link: string;
  file: string;
  file_hash: string;
  received_file_content_type: string;
  transmission_type: string;
}

export interface Uba {
  id: number;
  created_at: string;
  updated_at: string; // تاریخ بروز رسانی
  username: string; // نام کاربرب
  file_names: string[]; // تایپ های غیر مجاز
  original_file_name: null | string; // نام اصلی
  file_hash: string;
  transmission_type: null | string; // اکشن
  is_ban: boolean; // مسدود شده
  malbehave_count: number; // تعداد رفتار غیر مجاز
}

export interface IScanStats {
  info: { today_scans: number; remaining_days: number; malware_files: number };
}

export interface IMimeType {
  created_at: string;
  extension_list: string;
  file: string | null;
  id: number;
  mimetype_list: string;
  updated_at: string;
}

export interface IAddConfigAnalyze {
  file_content_type: any;
  id?: number | null;
  log_server_host: string;
  log_server_port: number;
}
export interface IAddConfigAnalyzeDownload {
  file_content_type: string;
  username: string;
  file_hash: string;
}
