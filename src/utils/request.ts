import fetch, { AbortError, FetchError } from 'node-fetch';

import { DEFAULT_TIMEOUT, METHOD_VALUES } from '@/constant/request';
import { CustomError, CustomFetchError } from '@/model/error';
import { logger } from '@/utils/logger';

type Params = {
  url: string;
  method: METHOD_VALUES;
  timeout?: number;
  headers?: fetch.HeadersInit;
  body?: fetch.BodyInit;
};

/**
 * 各 HTTP メソッドの対応は必要になったら拡張
 */
export const fetchWrapper = async (params: Params) => {
  const signal = AbortSignal.timeout(params.timeout || DEFAULT_TIMEOUT);
  const options: fetch.RequestInit = {
    method: params.method,
    body: params.body ? JSON.stringify(params.body) : undefined,
    headers: params.headers ? params.headers : undefined,
    signal,
  };

  try {
    return await fetch(params.url, options);
  } catch (err) {
    logger.error(err);
    if (err instanceof Error) {
      if (err instanceof AbortError || err instanceof FetchError) {
        throw new CustomFetchError('fetchエラーが発生', err);
      } else {
        throw new CustomError('想定外エラーが発生', err);
      }
    } else {
      logger.error('不明なエラーが発生');
      throw err;
    }
  }
};
