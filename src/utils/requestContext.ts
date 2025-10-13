import { AsyncLocalStorage } from 'async_hooks';

type Context = {
  requestId: string;
};

export const requestContext = new AsyncLocalStorage<Context>();
