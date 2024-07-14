import { IUser } from '@src/services/users/types';

import { Daas } from '../Daas';

export function UserPanel({ user }: { user: IUser }) {
  const isSSl = import.meta.env.VITE_IS_SSL;
  const isSSlTrue = isSSl === 'true';
  const httpCondition = isSSlTrue ? 'https' : 'http';
  const changePort = isSSlTrue ? user?.https_port : user?.http_port;

  return <Daas src={`${httpCondition}://${user?.base_url}:${changePort}`} />;
}
