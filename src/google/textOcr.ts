import { ImageAnnotatorClient } from '@google-cloud/vision';

import { GCLOUD_SERVICE_ACCOUNT_KEY } from '@/constant/google';
import { CustomError, GoogleError } from '@/model/error';
import { logger } from '@/utils/logger';

/**
 * 1度のリクエストで複数の画像を添える or 事前に画像を結合してリクエスト数を節約できるらしいが、
 * 文字起こし精度が未知数 and 課金額に至っても軽微なため1枚ずつ文字起こし
 */
export const getOcr = async (base64Image: string) => {
  const client = new ImageAnnotatorClient({
    credentials: GCLOUD_SERVICE_ACCOUNT_KEY,
  });
  try {
    const request = {
      image: {
        content: base64Image,
      },
      features: [
        {
          type: 'TEXT_DETECTION',
        },
      ],
    };
    const [result] = await client.annotateImage(request);
    const text = result.fullTextAnnotation?.text;
    logger.debug(text);
    return text || '';
  } catch (e) {
    const err = e as unknown as Error;
    logger.error(err);
    if ('code' in err) {
      throw new GoogleError('Cloud Vision API でエラーが発生', err);
    } else {
      throw new CustomError('想定外エラーが発生');
    }
  } finally {
    await client.close();
  }
};
