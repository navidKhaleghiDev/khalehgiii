import { EIpType } from '@ui/Templates/FilterAndList/components/molecules/Filter/Ips';

export interface IResponseRules {
  count: number;
  next: string | null;
  previous: string | null;
  results: IRules[];
}

export interface IIp {
  id?: string;
  ip_type: EIpType;
  ip: string;
  created_at?: string;
  updated_at?: string;
}

export interface ResponseSwr<T> {
  data: T;
}

export interface BodyId {
  id: string;
}

export interface BodyUpdateIp {
  ip: string;
}

export interface IMyRule {
  id?: string;
  creator: {
    id: string;
    device_serial: string;
    last_login: string;
    first_name: string;
    last_name: string;
    is_staff: boolean;
    is_active: boolean;
    date_joined: string;
    username: string;
    email: string;
    password: string;
    is_superuser: boolean;
    is_admin: boolean;
    is_analyser: boolean;
    groups: [];
    user_permissions: [];
  };
  rule_name: string;
  rule_code: string;
  description: string;
  created_at: string;
  update_at: string;
  version: number;
  isUpdated?: boolean;
}

export interface IRules {
  id: string;
  name: string;
  is_verified: boolean;
  is_public: boolean;
  version: number;
  created_at?: string;
  updated_at?: string;
  description: string;
  code: string;
}
export interface IBodyUpdateMyRule {
  rule_code: string;
  description?: string;
}

export interface IBodyAssignOwner {
  serial: string;
}

export interface IParamsRules {
  pageSize?: number;
  page?: number;
  search?: string;
}
export interface IBodyAddRule {
  rule_code?: string;
  id: string;
}
