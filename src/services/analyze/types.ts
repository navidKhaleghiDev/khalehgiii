export enum EScannerStatus {
  FINISHED = "FINISHED",
  IN_PROCESS = "IN_PROCESS",
  FAILED = "FAILED",
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
}
