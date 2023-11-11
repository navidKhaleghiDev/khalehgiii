import { EScannerStatus, IScannedFile } from "@src/services/analyze/types";

export const daasListDataMock = Array.from({ length: 10 }, (_, index) => ({
  id: index,
  email: "Radmehr.h@test1.local",
  http_port: 30915,
  https_port: 30678,
}));

// id: number;
//   file_name: string;
//   file_size_in_bytes: number;
//   file_content_type: string;
//   username: string;
//   yara_scanner_status:EScannerStatus.FINISHED;
//   clamav_scanner_status:EScannerStatus.FINISHED;
//   yara_scan_summary: string | null;
//   yara_scan_result: boolean;
//   yara_error_message: string | null;
//   clamav_scan_summary: string | null;
//   clamav_scan_result: boolean;
//   antiviruses_scan_result: boolean;
//   antiviruses_scanner_status:EScannerStatus.FAILED;
//   antiviruses_scan_sandbox_summary: string | null;
//   antiviruses_scan_vendors_summary: string | null;
//   antiviruses_last_analysis_stats: string | null;
//   antiviruses_crowdsourced_ids_results: string | null;
//   antiviruses_error_message: string | null;
//   clamav_error_message: string | null;
//   created_at: string;

export const scannedFileListDataMock: IScannedFile[] = [
  {
    id: 230,

    file_name: "kubernetes-for-full-stack-developers.pdf",
    file_size_in_bytes: 8864643,
    file_content_type: "application/pdf",
    username: "Radmehr.h@test1.local",
    yara_scanner_status: EScannerStatus.FINISHED,
    clamav_scanner_status: EScannerStatus.FINISHED,
    yara_scan_summary:
      "{'matched_rules': [vmdetect, Big_Numbers0, Big_Numbers1]}",
    yara_scan_result: true,
    yara_error_message: null,
    clamav_scan_summary: "clamav did not find any viruses for this file",
    clamav_scan_result: false,
    antiviruses_scan_result: false,
    antiviruses_scanner_status: EScannerStatus.FAILED,
    antiviruses_scan_sandbox_summary: "{}",
    antiviruses_scan_vendors_summary: "{}",
    antiviruses_last_analysis_stats:
      "{'harmless': 0, 'type-unsupported': 13, 'suspicious': 0, 'confirmed-timeout': 0, 'timeout': 0, 'failure': 0, 'malicious': 0, 'undetected': 62}",
    antiviruses_crowdsourced_ids_results: null,
    antiviruses_error_message: null,
    clamav_error_message: null,
    created_at: "2023-11-06T11:00:03.841835Z",
  },
  {
    id: 227,

    file_name: ".gtkrc-2.0",
    file_size_in_bytes: 265,
    file_content_type: "application/octet-stream",
    username: "Radmehr.h@test1.local",
    yara_scanner_status: EScannerStatus.FINISHED,
    clamav_scanner_status: EScannerStatus.FINISHED,
    yara_scan_summary: "yara did not find any virus for this file",
    yara_scan_result: false,
    yara_error_message: null,
    clamav_scan_summary: "clamav did not find any viruses for this file",
    clamav_scan_result: false,
    antiviruses_scan_result: false,
    antiviruses_scanner_status: EScannerStatus.FAILED,
    antiviruses_scan_sandbox_summary: null,
    antiviruses_scan_vendors_summary: null,
    antiviruses_last_analysis_stats: null,
    antiviruses_crowdsourced_ids_results: null,
    antiviruses_error_message:
      'File "d687cf5307084e02eaf6f1f9f92a41e2" not found',
    clamav_error_message: null,
    created_at: "2023-11-05T10:55:03.658579Z",
  },
  {
    id: 233,

    file_name: "netsep-192*192.png",
    file_size_in_bytes: 10430,
    file_content_type: "image/png",
    username: "Radmehr.h@test1.local",
    yara_scanner_status: EScannerStatus.FINISHED,
    clamav_scanner_status: EScannerStatus.FINISHED,
    yara_scan_summary: "{'matched_rules': [png]}",
    yara_scan_result: true,
    yara_error_message: null,
    clamav_scan_summary: "clamav did not find any viruses for this file",
    clamav_scan_result: false,
    antiviruses_scan_result: false,
    antiviruses_scanner_status: EScannerStatus.FAILED,
    antiviruses_scan_sandbox_summary: null,
    antiviruses_scan_vendors_summary: null,
    antiviruses_last_analysis_stats: null,
    antiviruses_crowdsourced_ids_results: null,
    antiviruses_error_message:
      'File "7b7b20bafceda3acfb5088cd95086a13" not found',
    clamav_error_message: null,
    created_at: "2023-11-06T11:36:47.481982Z",
  },
  {
    id: 228,

    file_name: "index.html",
    file_size_in_bytes: 33879,
    file_content_type: "text/html",
    username: "Radmehr.h@test1.local",
    yara_scanner_status: EScannerStatus.FINISHED,
    clamav_scanner_status: EScannerStatus.FINISHED,
    yara_scan_summary: "yara did not find any virus for this file",
    yara_scan_result: false,
    yara_error_message: null,
    clamav_scan_summary: "clamav did not find any viruses for this file",
    clamav_scan_result: false,
    antiviruses_scan_result: false,
    antiviruses_scanner_status: EScannerStatus.FAILED,
    antiviruses_scan_sandbox_summary: null,
    antiviruses_scan_vendors_summary: null,
    antiviruses_last_analysis_stats: null,
    antiviruses_crowdsourced_ids_results: null,
    antiviruses_error_message:
      'File "e7c8457579185fd0b14eb075f9deeb16" not found',
    clamav_error_message: null,
    created_at: "2023-11-06T08:15:16.809000Z",
  },
  {
    id: 231,

    file_name: "netsep-64*64.png",
    file_size_in_bytes: 3133,
    file_content_type: "image/png",
    username: "Radmehr.h@test1.local",
    yara_scanner_status: EScannerStatus.FINISHED,
    clamav_scanner_status: EScannerStatus.FINISHED,
    yara_scan_summary: "{'matched_rules': [png]}",
    yara_scan_result: true,
    yara_error_message: null,
    clamav_scan_summary: "clamav did not find any viruses for this file",
    clamav_scan_result: false,
    antiviruses_scan_result: false,
    antiviruses_scanner_status: EScannerStatus.FAILED,
    antiviruses_scan_sandbox_summary: null,
    antiviruses_scan_vendors_summary: null,
    antiviruses_last_analysis_stats: null,
    antiviruses_crowdsourced_ids_results: null,
    antiviruses_error_message:
      'File "fb7147e4030ee2d61a1ba252450b2ab8" not found',
    clamav_error_message: null,
    created_at: "2023-11-06T11:01:54.093364Z",
  },
  {
    id: 229,

    file_name: "Untitled.jpeg",
    file_size_in_bytes: 3590,
    file_content_type: "image/jpeg",
    username: "Radmehr.h@test1.local",
    yara_scanner_status: EScannerStatus.FINISHED,
    clamav_scanner_status: EScannerStatus.FINISHED,
    yara_scan_summary: "yara did not find any virus for this file",
    yara_scan_result: false,
    yara_error_message: null,
    clamav_scan_summary: "clamav did not find any viruses for this file",
    clamav_scan_result: false,
    antiviruses_scan_result: false,
    antiviruses_scanner_status: EScannerStatus.FAILED,
    antiviruses_scan_sandbox_summary: "{}",
    antiviruses_scan_vendors_summary: "{}",
    antiviruses_last_analysis_stats:
      "{'harmless': 0, 'type-unsupported': 16, 'suspicious': 0, 'confirmed-timeout': 0, 'timeout': 1, 'failure': 1, 'malicious': 0, 'undetected': 57}",
    antiviruses_crowdsourced_ids_results: null,
    antiviruses_error_message: null,
    clamav_error_message: null,
    created_at: "2023-11-06T10:53:25.791481Z",
  },
  {
    id: 232,

    file_name: "netsep-96*96.png",
    file_size_in_bytes: 4784,
    file_content_type: "image/png",
    username: "Radmehr.h@test1.local",
    yara_scanner_status: EScannerStatus.FINISHED,
    clamav_scanner_status: EScannerStatus.FINISHED,
    yara_scan_summary: "{'matched_rules': [png]}",
    yara_scan_result: true,
    yara_error_message: null,
    clamav_scan_summary: "clamav did not find any viruses for this file",
    clamav_scan_result: false,
    antiviruses_scan_result: false,
    antiviruses_scanner_status: EScannerStatus.FAILED,
    antiviruses_scan_sandbox_summary: null,
    antiviruses_scan_vendors_summary: null,
    antiviruses_last_analysis_stats: null,
    antiviruses_crowdsourced_ids_results: null,
    antiviruses_error_message:
      'File "c9bff34e36e1f4a1108c025db90b3498" not found',
    clamav_error_message: null,
    created_at: "2023-11-06T11:35:31.663985Z",
  },
];
