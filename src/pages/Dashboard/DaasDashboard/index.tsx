import { useUserContext } from '@context/user/userContext';
import { Daas } from '../Daas';

export function DaasDashboard() {
  const { user } = useUserContext();

  const isSSl = import.meta.env.VITE_IS_SSL;
  const isSSlTrue = isSSl === 'true';
  const httpCondition = isSSlTrue ? 'https' : 'http';
  const changePort = isSSlTrue ? user?.https_port : user?.http_port;

  const onlineAssistanceAddress = isSSlTrue
    ? user?.online_assistance?.user_https_address
    : user?.online_assistance?.user_http_address;

  const src = user?.online_assistance?.user_http_address
    ? onlineAssistanceAddress
    : `${httpCondition}://${user?.base_url}:${changePort}`;

  return <Daas src={src as string} />;
}