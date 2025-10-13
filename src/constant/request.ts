export const METHOD = {
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;
export type METHOD_KEYS = keyof typeof METHOD;
export type METHOD_VALUES = (typeof METHOD)[METHOD_KEYS];

export const DEFAULT_TIMEOUT = 10000;
