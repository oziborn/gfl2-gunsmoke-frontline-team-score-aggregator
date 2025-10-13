import { ENV } from '@/utils/env';

export const GCLOUD_SERVICE_ACCOUNT_KEY = {
  type: ENV.GCLOUD_TYPE,
  project_id: ENV.GCLOUD_PROJECT_ID,
  private_key_id: ENV.GCLOUD_PRIVATE_KEY_ID,
  private_key: ENV.GCLOUD_PRIVATE_ID.replace(/\\n/g, '\n'),
  client_email: ENV.GCLOUD_CLIENT_EMAIL,
  client_id: ENV.GCLOUD_CLIENT_ID,
  auth_uri: ENV.GCLOUD_AUTH_URI,
  token_uri: ENV.GCLOUD_TOKEN_URI,
  auth_provider_x509_cert_url: ENV.GCLOUD_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: ENV.GCLOUD_CLIENT_X509_CERT_URL,
  universe_domain: ENV.GCLOUD_UNIVERSE_DOMAIN,
} as const;
