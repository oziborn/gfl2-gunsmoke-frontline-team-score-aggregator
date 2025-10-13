import { Message } from 'discord.js';

import { getOcr } from '@/google/textOcr';
import { getBase64Images, getUrls } from '@/model/attachment';
import { analyticsTexts, mergeScoreAndUsers } from '@/model/score';
import { upsertScore } from '@/repo/scores';
import { getUsers } from '@/repo/users';
import { logger } from '@/utils/logger';

export const handler = async (message: Message) => {
  const { attachments } = message;
  if (attachments.size === 0) {
    logger.info('添付ファイルがないため中断');
    return;
  }
  const urls = getUrls(attachments);

  const texts: string[] = [];
  for await (const base64Image of getBase64Images(urls)) {
    const text = await getOcr(base64Image);
    if (text.length > 0) {
      texts.push(text);
    }
  }
  if (texts.length === 0) {
    logger.info('読み取りデータがないため中断');
    return;
  }
  const users = await getUsers();
  const score = analyticsTexts(texts, users);
  logger.info(score);
  const mergedScore = mergeScoreAndUsers(score, users);
  const updatedScore = await upsertScore(mergedScore);
  logger.info(updatedScore);
};
