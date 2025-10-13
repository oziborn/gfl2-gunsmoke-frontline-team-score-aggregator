import { Attachment, Collection } from 'discord.js';

import { METHOD } from '@/constant/request';
import { isImage } from '@/model/contentType';
import { CustomError } from '@/model/error';
import { logger } from '@/utils/logger';
import { fetchWrapper } from '@/utils/request';

export const getUrls = (
  attachments: Collection<string, Attachment>
): string[] => {
  const urls = attachments
    .filter((attachment) => {
      const { contentType } = attachment;
      if (!contentType) {
        return false;
      }
      return isImage(contentType);
    })
    .map((attachment) => {
      const safeUrl = URL.parse(attachment.url);
      return safeUrl?.href;
    })
    .filter((url) => url !== undefined);
  return urls;
};

export const getBase64Images = async function* (urls: string[]) {
  for (let i = 0; i < urls.length; i++) {
    const url = urls[i];
    logger.debug(url);
    const res = await fetchWrapper({ url, method: METHOD.GET });
    if (!res.ok || res.status !== 200) {
      throw new CustomError('データ取得に失敗');
    } else if (!isImage(res.headers.get('content-type'))) {
      throw new CustomError('取得データが画像ではありません');
    }
    const arrayBuf = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuf);
    yield buffer.toString('base64');
  }
};
