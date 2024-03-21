import { DEFAULT_PAGINATION_LIMIT, MAX_PAGINATION_LIMIT } from '../constants';

export const delay = (ms: number) => new Promise((_) => setTimeout(_, ms));

const parseString = (str: string | null) => {
  /* istanbul ignore next */
  if (typeof str === 'string' && str === '') return null;
  else if (typeof str === 'string' && str) return str.trim();
  else return str;
};

/* istanbul ignore next */
export const emptyStringsToNull = (obj: {
  [x: string]: null;
}): {
  [key: string]: string | null;
} => {
  const map: { [key: string]: string | null } = obj;

  if (map && typeof map === 'object' && !Array.isArray(map)) {
    for (const key of Object.keys(map)) {
      map[key] = parseString(map[key]);
    }
    return map;
  } else {
    return map;
  }
};

/* istanbul ignore next */
export const toRemoveAllSpaces = (str: string): string => {
  return str && typeof str === 'string' ? str.replaceAll(/\s+/g, '') : '';
};
/* istanbul ignore next */
export const toLowerCase = (str: string): string => {
  return str && typeof str === 'string' ? str.toLowerCase() : '';
};

/* istanbul ignore next */
export const numberPadding = (num: number, size: number): string | number => {
  if (num.toString().length >= size) return num;
  return (10 ** size + Math.floor(num)).toString().slice(1);
};

/* istanbul ignore next */
export const isEqualIgnoreCase = (val: string, othrVal: string): boolean => {
  return val.toLowerCase() === othrVal.toLowerCase();
};

/* istanbul ignore next */
export const err = (e: { errors: string | Record<string, unknown>; message: string; sql: string; msg: string }): string => {
  let msg;
  if (e.errors) msg = JSON.stringify(e.errors);
  else if (e.message) {
    msg = e.message;
    if (e.sql) msg += ` SQL: '${e.sql}`;
  } else if (e.msg) msg = JSON.stringify(e);
  else msg = JSON.stringify(e);
  return msg;
};

/* istanbul ignore next */
export const parseJson = (
  txt: string | string[],
  reviver: ((this: unknown, key: string, value: unknown) => unknown) | undefined,
  context: number
): string | Error => {
  // eslint-disable-next-line unicorn/prefer-default-parameters
  context = context || 20; // eslint-disable-line no-param-reassign
  try {
    return typeof txt === 'string' && JSON.parse(txt, reviver);
  } catch (error) {
    if (typeof txt !== 'string') {
      const isEmptyArray = Array.isArray(txt) && txt.length === 0;
      const errorMessage = `Cannot parse ${isEmptyArray ? 'an empty array' : String(txt)}`;
      throw new TypeError(errorMessage);
    }

    if (error instanceof Error) {
      const syntaxErr = new RegExp(/^unexpected token.*position\s+(\d+)/i).exec(error.message);
      let errIdx;
      if (syntaxErr) {
        errIdx = +syntaxErr[1];
      } else {
        errIdx = /^unexpected end of json.*/i.test(error.message) ? txt.length - 1 : null;
      }

      if (errIdx == null) {
        error.message += ` while parsing '${txt.slice(0, context * 2)}'`;
      } else {
        const start = errIdx <= context ? 0 : errIdx - context;
        const end = errIdx + context >= txt.length ? txt.length : errIdx + context;
        error.message += ` while parsing near '${start === 0 ? '' : '...'}${txt.slice(start, end)}${
          end === txt.length ? '' : '...'
        }'`;
      }
    }

    throw error;
  }
};

/* istanbul ignore next */
export const getPagingOffset = (l: number | undefined, p: number | undefined): Array<number> => {
  const limit: number = l && +l <= MAX_PAGINATION_LIMIT ? +l : DEFAULT_PAGINATION_LIMIT;
  const offset = ((p ? +p : 1) - 1) * +limit;

  return [limit, offset];
};

/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const flattenArray = function* (arr: Array<unknown>): any {
  for (const el of arr) {
    if (Array.isArray(el)) {
      yield* flattenArray(el);
    } else {
      yield el;
    }
  }
};
/* istanbul ignore next */
export const sec2time = (timeInSeconds: number) => {
  const d = Number(timeInSeconds);
  const h = Math.floor(d / 3600);
  const m = Math.floor((d % 3600) / 60);
  const s = Math.floor((d % 3600) % 60);

  const hString = h == 1 ? ' hour, ' : ' hours, ';
  const mString = m == 1 ? ' minute, ' : ' minutes, ';
  const sString = s == 1 ? ' second' : ' seconds';

  const hDisplay = h > 0 ? h + hString : '';
  const mDisplay = m > 0 ? m + mString : '';
  const sDisplay = s > 0 ? s + sString : '';
  return hDisplay + mDisplay + sDisplay;
};

/* istanbul ignore next */
export const encodeString = (msg: string) => {
  return Buffer.from(msg || '').toString('base64');
};

/* istanbul ignore next */
export const decodeString = (msg: string) => {
  return Buffer.from(msg || '', 'base64').toString('utf8');
};

export const getFileNameFromUrl = (url: string) => {
  //Retrieve filename from aws-s3 url
  return url?.split('#')?.shift()?.split('?')?.shift()?.split('/').pop();
};

export const getFileExtensionFromUrl = (url: string) => {
  const fileName = getFileNameFromUrl(url);
  return fileName?.split('.').pop();
};
