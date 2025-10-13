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

  texts.forEach((text) => {
    let latestUser = '';
    text.split('\n').forEach((word) => {
      // チームメンバーの名前と一致する単語
      if (users.includes(word)) {
        latestUser = word;
        if (!(word in summary)) {
          summary[word] = [];
        }
        return;
      }

      // 1日に1人3回まで挑戦できるため、すでにスコアが3つある場合はcontinue
      if (latestUser && summary[latestUser].length > 3) {
        return;
      }

      // 4桁の数字 = スコアの可能性が高い
      if (/^\d{4}$/.test(word) && !Number.isNaN(Number(word))) {
        const score = Number(word);
        // 4桁の数字 but 数字が低すぎる = スコアではない可能性が高いためcontinue
        if (score < 5000) {
          return;
        }
        summary[latestUser].push(score);
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
