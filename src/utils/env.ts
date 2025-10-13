const ENV = {
  LOG_LEVEL: process.env.LOG_LEVEL || 'error',

  // MongoDB
  MONGODB_SCHEMA: process.env.MONGODB_SCHEMA || '',
  MONGODB_NAMESPACE: process.env.MONGODB_NAMESPACE || '',
  MONGODB_DB_NAME: process.env.MONGODB_DB_NAME || '',

  // Discord
  DISCORD_TOKEN: process.env.DISCORD_TOKEN || '',
  DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID || '',
  DISCORD_GUILD_ID: process.env.DISCORD_GUILD_ID || '',
  DISCORD_OCR_TARGET_CHANNEL_ID:
    process.env.DISCORD_OCR_TARGET_CHANNEL_ID || '',

  // Google Cloud サービスアカウントの JSON データを分解したもの
  GCLOUD_TYPE: process.env.GCLOUD_TYPE || '',
  GCLOUD_PROJECT_ID: process.env.GCLOUD_PROJECT_ID || '',
  GCLOUD_PRIVATE_KEY_ID: process.env.GCLOUD_PRIVATE_KEY_ID || '',
  GCLOUD_PRIVATE_ID: (process.env.GCLOUD_PRIVATE_ID || '').replace(
    /\\n/g,
    '\n'
  ),
  GCLOUD_CLIENT_EMAIL: process.env.GCLOUD_CLIENT_EMAIL || '',
  GCLOUD_CLIENT_ID: process.env.GCLOUD_CLIENT_ID || '',
  GCLOUD_AUTH_URI: process.env.GCLOUD_AUTH_URI || '',
  GCLOUD_TOKEN_URI: process.env.GCLOUD_TOKEN_URI || '',
  GCLOUD_AUTH_PROVIDER_X509_CERT_URL:
    process.env.GCLOUD_AUTH_PROVIDER_X509_CERT_URL || '',
  GCLOUD_CLIENT_X509_CERT_URL: process.env.GCLOUD_CLIENT_X509_CERT_URL || '',
  GCLOUD_UNIVERSE_DOMAIN: process.env.GCLOUD_UNIVERSE_DOMAIN || '',
} as const;

export type ENV_KEYS = keyof typeof ENV;
export type ENV_VALUES = (typeof ENV)[ENV_KEYS];

export { ENV };
