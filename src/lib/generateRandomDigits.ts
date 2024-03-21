import ShortUniqueId from 'short-unique-id';

import * as crypto from 'crypto';

export interface IGenerateRandomOptions {
  length: number;
  dictionary: 'number' | 'alpha' | 'alpha_lower' | 'alpha_upper' | 'alphanum' | 'alphanum_lower' | 'alphanum_upper' | 'hex';
}

/* istanbul ignore next */
export default ({
  length,
  dictionary = 'number'
}: IGenerateRandomOptions):
  | 'number'
  | 'alpha'
  | 'alpha_lower'
  | 'alpha_upper'
  | 'alphanum'
  | 'alphanum_lower'
  | 'alphanum_upper'
  | 'hex' => {
  let uid = new ShortUniqueId({ length, dictionary })();

  if (dictionary === 'number') {
    const replacer = Math.floor((crypto.randomBytes(4).readUInt32LE() / 0xff_ff_ff_ff) * 9 + 1);

    // If the generated uid is in octal, replace leading zero with random integer

    if (+uid.charAt(0) === 0) {
      uid = uid.replace(uid.charAt(0), replacer);
    }

    // If the generated uid is lesser than the given length, replace remaining position with random integer
    if (uid.length < length) {
      uid = `${uid}${Array.from({ length: length - uid.length })
        .fill(replacer)
        .join('')}`;
    }
  }

  return uid;
};
