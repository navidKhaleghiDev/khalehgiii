import { IDaasConfig } from '@src/services/config/types';
import { IDaAs } from '@src/services/users/types';
import { StringifyProperties } from '@src/types/global';

export interface IHeaderDaasCard
  extends Omit<StringifyProperties<IDaAs>, 'daas_configs'> {
  daas_configs: StringifyProperties<IDaasConfig>;
}
