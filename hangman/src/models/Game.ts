import { Qiuz } from "./Quiz";
import { Stage } from "./Stage";
import { Message } from "./Message";
import { UserInterface, GameState } from "../types";


export class Game {
  quiz: Qiuz;
  message: Message;
  stage: Stage;
  ui: UserInterface;
  constructor(quiz: Qiuz, message: Message, ui: UserInterface) {
    this.quiz = quiz;
    this.message = message;
    this.ui = ui;
    this.stage = new Stage(quiz.getNext()); // 初期ステージの設定
  }

  shouldEnd(): boolean {
    // 失敗できる回数の上限を超えた場合
    if (this.stage.isGameOver()) {
      return true;
    }

    // 最終問題かつ、正解している場合
    if (!this.quiz.hasNext() && this.stage.isCorrect()) {
      return true;
    }
    return false;
  }
  
  next(isCorrect: boolean): GameState {
    if (!isCorrect) {
      this.stage.decrementAttempts();
    }

    if (this.shouldEnd()) {
      return { stage: this.stage, done: true };
    }

    if (isCorrect) {
      this.stage = new Stage(this.quiz.getNext());
    }

    return { stage: this.stage, done: false };
  }

  async start(): Promise<void> {
    this.ui.clear();
    this.message.start();

    // GameStateの初期化
    let state: GameState = { stage: this.stage, done: false };

    // ゲームオーバーになるか、すべの問題を正解するまで繰り返す
    while (!state.done) {
      if (state.stage === undefined) break;

      const { stage } = state; // stageオブジェクトを分割代入で取得

      this.message.leftQuestions(this.quiz); // 残りの問題数を表示
      this.message.askQuestion(stage); // 問題を表示

      // 解答者の入力を待機
      const userInput = await this.ui.input();

      // 入力チェック
      if (!userInput) {
        this.message.enterSomething();
        // 不正解として扱い、falseを渡してnextを呼び出し、GameStateを更新
        state = this.next(false);
        continue;
      }

      // 解答状況を最新の状態に更新
      stage.updateAnswer(userInput);

      // 入力が正解と完全一致するか判定
      if (stage.isCorrect()) {
        this.message.correct(stage.question);
        state = this.next(true);
        continue;
      }

      // 入力の文字数が単語の文字数を超えているか判定
      if (stage.isTooLong(userInput)) {
        this.message.notCorrect(userInput);
        state = this.next(false);
        continue;
      }

      // 入力が部分的に正解に一致するか判定
      if (stage.isInclues(userInput)) {
        this.message.hit(userInput);
        continue;
      }

      // 入力が単語に含まれていない場合
      this.message.notInclude(userInput);
      state = this.next(false);
    }

    // 試行回数が0か判定
    if (this.stage.isGameOver()) {
      this.message.gameOver(this.stage.question);
    }

    this.message.end();
    this.ui.destroy();
  }
}
