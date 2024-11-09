export interface LicenseFileType {
  id: string | number;
  active: any;
  created?: string | null;
  expiry?: string;
  license: boolean;
  name: string;
  number: number;
  concurrent?: number;
}
