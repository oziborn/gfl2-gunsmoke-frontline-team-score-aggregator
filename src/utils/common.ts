const RAND_CHARS =
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

/**
 * 日本語の ひらがな と カタカナ の小文字・大文字対応表
 */
const JAPANESE_LOWER_TO_UPPER_TABLE: { [key: string]: string } = {
  ぁ: 'あ',
  ぃ: 'い',
  ぅ: 'う',
  ぇ: 'え',
  ぉ: 'お',
  っ: 'つ',
  ゃ: 'や',
  ゅ: 'ゆ',
  ょ: 'よ',
  ゎ: 'わ',
  ァ: 'ア',
  ィ: 'イ',
  ゥ: 'ウ',
  ェ: 'エ',
  ォ: 'オ',
  ヵ: 'カ',
  ヶ: 'ケ',
  ッ: 'ツ',
  ャ: 'ヤ',
  ュ: 'ユ',
  ョ: 'ヨ',
  ヮ: 'ワ',
};

/**
 * 任意の桁数の乱数を生成する
 */
export const randStr = (digits: number = 10): string => {
  let str = '';
  for (let i = 0; i < digits; i++) {
    str += RAND_CHARS.charAt(Math.floor(Math.random() * RAND_CHARS.length));
  }
  return str;
};

/**
 * ひらがな と カタカナ を大文字に変換する
 */
export const convertJapaneseUpperCase = (originalStr: string) => {
  let converted = '';
  for (let i = 0; i < originalStr.length; i++) {
    const originalChar = originalStr[i];
    const convertedChar = JAPANESE_LOWER_TO_UPPER_TABLE[originalChar];
    if (convertedChar) {
      converted += convertedChar;
    } else {
      converted += originalChar;
    }
  }
  return converted;
};
