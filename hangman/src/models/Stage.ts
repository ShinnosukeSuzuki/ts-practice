import { Question } from "../types";


export class Stage {
  answer: string; // 解答の状態(ty_escri_t)
  leftAttempts: number = 5; // 残りの回答数
  question: Question; // 現在の質問
  constructor(question: Question) {
    this.question = question;
    this.answer = new Array(question.word.length).fill("_").join("");
  }

  updateAnswer(userInput: string = ""): void {
    if (!userInput) return; // 空文字の場合は何もしない

    const regex = new RegExp(userInput, "g"); // 入力を正規表現のパターンとして使用
    const answerArray = this.answer.split("");

    let matches : RegExpExecArray | null; // 正規表現での検索結果を格納する変数

    // 入力と一致する箇所がなくなるまで繰り返す
    while ((matches = regex.exec(this.question.word))) {
      const foundIndex = matches.index;
      // 対象のインデックスから、一致した箇所を入力された文字に置換
      answerArray.splice(foundIndex, userInput.length, ...userInput);

      this.answer = answerArray.join("");
    }
  }

  // 入力が単語の長さを超えているかどうかを判定
  isTooLong(userInput: string): boolean {
    return userInput.length > this.question.word.length;
  }

  // 単語に回答者の入力が含まれているかどうかを判定
  isInclues(userInput: string): boolean {
    return this.question.word.includes(userInput);
  }

  // 解答が単語の全ての文字列と一致しているかどうかを判定
  isCorrect(): boolean {
    return this.answer === this.question.word;
  }

  // 試行回数を1減らす
  decrementAttempts(): number {
    return --this.leftAttempts;
  }

  // 試行回数が0かどうかを判定
  isGameOver(): boolean {
    return this.leftAttempts === 0;
  }
}
