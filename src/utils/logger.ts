import pino, { Logger as PinoLogger } from 'pino';

import { ENV } from '@/utils/env';
import { requestContext } from '@/utils/requestContext';

export const logger: PinoLogger = pino({
  base: {},
  timestamp: pino.stdTimeFunctions.isoTime,
  level: ENV.LOG_LEVEL,
  formatters: {
    level(label) {
      return { level: label };
    },
  },
  mixin() {
    const store = requestContext.getStore();

    if (store && store.requestId) {
      return { reqId: store.requestId };
    } else {
      return {};
    }
  },
});
