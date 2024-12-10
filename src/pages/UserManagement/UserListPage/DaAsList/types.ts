import { DaasConfig } from '@src/services/config/types';
import { DaAsParams } from '@src/services/users/types';
import { StringifyProperties } from '@src/types/global';

export interface HeaderDaasCard
  extends Omit<StringifyProperties<DaAsParams>, 'daas_configs'> {
  daas_configs: StringifyProperties<DaasConfig>;
}
