import KeyvMongo from '@keyv/mongo';
import Keyv from 'keyv';

import { ENV } from '@/utils/env';
import { logger } from '@/utils/logger';

/**
 * 本来はシングルトンでサーバーの起動時にインスタンス生成→停止時にdisconnectが望ましい
 */
export const getUsers = async () => {
  const keyv = new Keyv(
    new KeyvMongo(ENV.MONGODB_SCHEMA, {
      namespace: ENV.MONGODB_NAMESPACE,
      db: ENV.MONGODB_DB_NAME,
      collection: 'users',
    })
  );
  keyv.on('error', (err: unknown) => logger.info(JSON.stringify(err)));
  keyv.on('clear', () => logger.info('Cache Cleared'));
  keyv.on('disconnect', () => logger.info('Disconnected'));

  const KEY = 'ALL_USERS';
  const strValue = await keyv.get<string>(KEY);
  const { data }: { data: string[] } = JSON.parse(String(strValue));
  logger.debug(data);
  await keyv.disconnect();
  return data;
};
