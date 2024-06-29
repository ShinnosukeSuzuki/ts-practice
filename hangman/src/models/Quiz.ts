import { Question } from "../types";

export class Qiuz {
  questions: Question[];
  constructor(questions: Question[]) {
    this.questions = questions;
  }

  // ランダムに質問を取得して、その質問をリストから削除する
  getNext(): Question {
    const index = Math.floor(Math.random() * this.questions.length);
    const [question] = this.questions.splice(index, 1);
    return question;
  }

  // 次の質問があるかどうかを返す
  hasNext(): boolean {
    return this.questions.length > 0;
  }

  // 残りの質問数を取得
  lefts(): number {
    return this.questions.length;
  }
}
