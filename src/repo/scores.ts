import KeyvMongo from '@keyv/mongo';
import Keyv from 'keyv';

import { Score } from '@/model/score';
import { getJstDateYYYYMMDD } from '@/utils/date';
import { ENV } from '@/utils/env';
import { logger } from '@/utils/logger';

/**
 * 本来はシングルトンでサーバーの起動時にインスタンス生成→停止時にdisconnectが望ましい
 */
export const upsertScore = async (newScore: Score) => {
  const keyv = new Keyv(
    new KeyvMongo(ENV.MONGODB_SCHEMA, {
      namespace: ENV.MONGODB_NAMESPACE,
      db: ENV.MONGODB_DB_NAME,
      collection: 'scores',
    })
  );
  keyv.on('error', (err: unknown) => logger.info(JSON.stringify(err)));
  keyv.on('clear', () => logger.info('Cache Cleared'));
  keyv.on('disconnect', () => logger.info('Disconnected'));

  const KEY = `${getJstDateYYYYMMDD()}_SCORE`;

  // 今のスコアを取り出して、新たに読み取ったスコアを追加→保存する
  const strValue = await keyv.get<string | undefined>(KEY);
  let currentScore: Score = {};
  if (strValue) {
    currentScore = JSON.parse(String(strValue));
  }
  Object.entries(newScore).forEach(([user, points]) => {
    if (currentScore[user]) {
      // TODO: 重複読み取りをチェックする方法がないため、同じデータを何度も読みとって被る可能性アリ
      points.forEach((point) => {
        if (currentScore[user].length < 3) {
          currentScore[user].push(point);
        }
      });
    } else {
      currentScore[user] = points;
    }
  });
  await keyv.set(KEY, JSON.stringify(currentScore));

  await keyv.disconnect();
  return currentScore;
};

/**
 * 本来はシングルトンでサーバーの起動時にインスタンス生成→停止時にdisconnectが望ましい
 */
export const getScore = async (dateStr: string) => {
  const keyv = new Keyv(
    new KeyvMongo(ENV.MONGODB_SCHEMA, {
      namespace: ENV.MONGODB_NAMESPACE,
      db: ENV.MONGODB_DB_NAME,
      collection: 'scores',
    })
  );
  keyv.on('error', (err: unknown) => logger.info(JSON.stringify(err)));
  keyv.on('clear', () => logger.info('Cache Cleared'));
  keyv.on('disconnect', () => logger.info('Disconnected'));

  const KEY = `${dateStr}_SCORE`;

  const strValue = await keyv.get<string | undefined>(KEY);
  let currentScore: Score = {};
  if (strValue) {
    currentScore = JSON.parse(String(strValue));
  }

  await keyv.disconnect();
  return currentScore;
};
