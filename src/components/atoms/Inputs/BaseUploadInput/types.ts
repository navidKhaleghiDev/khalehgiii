export type BaseUploadInputProps = {
  control: any;
  name: any;
  rules: any;
  defaultValue?: any;
  type: 'add' | 'edit';
  onClick?: any;
  setValue: (name: any, value: any) => void;
  clearErrors: (name: any) => void;
  disabled?: boolean;
};

export type TFile = {
  lastModified: string;
  lastModifiedDate: string;
  name: string;
  size: number;
  type: string;
  webkitRelativePath: string;
};
