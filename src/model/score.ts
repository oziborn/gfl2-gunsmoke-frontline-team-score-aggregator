import { convertJapaneseUpperCase } from '@/utils/common';

/**
 * チームメンバー1人1人のスコア
 */
export type Score = {
  [user: string]: number[];
};

/**
 * Cloud Vision API で塵煙前線のスコアを含む画像から文字起こししたテキストを解析する
 */
export const analyticsTexts = (texts: string[], users: string[]) => {
  const summary: Score = {};
  const correctedUsers = getCorrectedUsers(users);

  texts.forEach((text) => {
    // 解析中に ユーザ名 → スコア の並び順で出現するとは限らないため、名前とスコアが揃ったら追加する
    let latestUser = '';
    let latestScore = 0;

    text.split('\n').forEach((word) => {
      // 1組のユーザとスコアが揃ったら追加してリセット
      if (latestUser && latestScore) {
        summary[latestUser].push(latestScore);
        latestUser = '';
        latestScore = 0;
      }

      // チームメンバーの名前と一致する単語かチェック
      const user = correctedUsers[convertJapaneseUpperCase(word)];
      if (user) {
        latestUser = user;
        if (!(user in summary)) {
          summary[user] = [];
        }
        return;
      }

      // 1日に1人3回まで挑戦できるため、既にあるユーザにスコアが3つある場合はcontinue
      if (latestUser && summary[latestUser].length === 3) {
        return;
      }

      // 4桁の数字 = スコアの可能性が高い
      if (/^\d{4}$/.test(word) && !Number.isNaN(Number(word))) {
        const score = Number(word);
        // 4桁の数字 but 数字が低すぎる = スコアではない可能性が高いためcontinue
        if (score < 5000) {
          return;
        } else {
          latestScore = score;
        }
      }
    });
  });

  return summary;
};

/**
 * score は読み取ったユーザの情報しか含まれていないため、集計情報の確認向けに全ユーザ名を追加する
 */
export const mergeScoreAndUsers = (score: Score, users: string[]) => {
  const mergedScore = { ...score };
  users.forEach((user) => {
    if (!mergedScore[user]) {
      mergedScore[user] = [];
    }
  });
  return mergedScore;
};

/**
 * OCR結果で ひらがな カタカナ の大文字/小文字の読み取り精度が低いため、
 * 大文字でのユーザ名を加えたオブジェクトを返す
 */
export const getCorrectedUsers = (users: string[]) => {
  const correctedUsers: { [upperCaseUserName: string]: string } = {};
  users.forEach((user) => {
    correctedUsers[convertJapaneseUpperCase(user)] = user;
  });
  return correctedUsers;
};
