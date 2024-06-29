import { Qiuz } from "./Quiz";
import { Stage } from "./Stage";
import { Question, UserInterface } from "../types";


export class Message {
  ui : UserInterface;
  constructor(ui: UserInterface) {
    this.ui = ui;
  }

  // 問題を解答者に表示
  askQuestion(stage: Stage): void {
    this.ui.output(`ヒント: ${stage.question.hint}`, "yellow");
    this.ui.outputAnswer(stage.answer.replaceAll("", " ").trim());
    this.ui.output(`（残りの試行回数: ${stage.leftAttempts}）`);
  }

  leftQuestions(quiz: Qiuz): void {
    this.ui.output(`残りの質問数: ${quiz.lefts()}`);
  }

  start(): void {
    this.ui.output("ハングマンゲームを開始します", "green");
  }

  enterSomething(): void {
    this.ui.output("何か入力してください", "red");
  }

  notInclude(input: string): void {
    this.ui.output(`${input}は単語に含まれていません`, "red");
  }

  notCorrect(input: string): void {
    this.ui.output(`残念！ ${input}は正解ではありません。`, "red");
  }

  hit(input: string): void {
    this.ui.output(`${input}がHit!`, "green");
  }

  correct(question: Question): void {
    this.ui.output(`正解！ 単語は${question.word}でした`, "green");
  }

  gameOver(question: Question): void {
    this.ui.output(`ゲームオーバー！ 正解は${question.word}でした`);
  }

  end(): void {
    this.ui.output("ハングマンゲームを終了します");
  }
}
