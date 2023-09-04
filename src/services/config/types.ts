export interface IAddConfig {
  id?: number | null;
  keycloak_base_url: string;
  keycloak_port: string;
  keycloak_ssl: boolean;
  keycloak_client_id: string;
  keycloak_secret: string;
  keycloak_realm: string;
  daas_provider_baseurl: string;
}
