export interface IFileType {
  clamav_is_active: boolean;
  created_at: string;
  email: string;
  id?: number | string | undefined;
  license_creation: string;
  license_expiration_date: string;
  license_id: string;
  sandbox_is_active: boolean;
  updated_at: string;
  username: string | null | undefined;
  valid_license: boolean;
  yara_is_active: boolean;
}
export interface IHeaderItem {
  clamav_is_active: string;
  created_at: string;
  email: string;
  id?: number | string | undefined;
  license_creation: string;
  license_expiration_date: string;
  license_id: string;
  sandbox_is_active: string;
  updated_at: string;
  username: string | null | undefined;
  valid_license: string;
  yara_is_active: string;
}
