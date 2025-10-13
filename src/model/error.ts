import { AbortError, FetchError } from 'node-fetch';

export class CustomError extends Error {
  original?: Error;

  constructor(msg: string, original?: Error) {
    super(msg);
    this.name = 'CustomError';
    this.original = original;
  }
}

export class CustomFetchError extends CustomError {
  constructor(msg: string, original: AbortError | FetchError) {
    super(msg, original);
    this.name = 'CustomFetchError';
  }
}

export class GoogleError extends CustomError {
  constructor(msg: string, original: Error) {
    super(msg, original);
    this.name = 'GoogleError';
  }
}
