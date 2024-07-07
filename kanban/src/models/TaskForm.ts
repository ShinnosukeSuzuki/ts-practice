import { bound } from "../decorator/bindThis.js";
import { TaskItem } from "./TaskItem.js";
import { Task } from "../types.js";

export class TaskForm {
  element: HTMLFormElement;
  titleInputEl: HTMLInputElement;
  descriptionInputEl: HTMLTextAreaElement;

  constructor() {
    // form要素を取得
    this.element = document.querySelector("#task-form")!;

    // input要素を取得
    this.titleInputEl = document.querySelector("#form-title")!;
    this.descriptionInputEl = document.querySelector("#form-description")!;

    // イベントリスナを設定
    this.bindEvents();
  }

  private makeNewTask(): Task {
    return {
      // status: TASK_STATUS[0],
      title: this.titleInputEl.value,
      description: this.descriptionInputEl.value,
    };
  }

  private clearInputs(): void {
    this.titleInputEl.value = "";
    this.descriptionInputEl.value = "";
  }

  // thisをインスタンスに束縛
  @bound
  private submitHandler(event: Event) {
    event.preventDefault(); // ブラウザのデフォルトの動作をキャンセル

    // Taskオブジェクトの生成
    const task = this.makeNewTask();

    // TaskItemインスタンスを生成
    const item = new TaskItem(task);
    item.mount("#todo");

    this.clearInputs();
  }

  // 入力フォームにイベントリスナを追加
  private bindEvents() {
    this.element.addEventListener("submit", this.submitHandler);
  }
}
