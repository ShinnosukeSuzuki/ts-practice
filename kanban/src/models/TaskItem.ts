import { bound } from "../decorator/bindThis.js";
import { UIComponent } from "./UIComponent.js";
import { Task, TaskStatus, TASK_STATUS, ClickableElement } from "../types.js";

export class TaskItem extends UIComponent<HTMLLIElement> implements ClickableElement{
  task: Task;

  constructor(_task: Task) {
    super("#task-item-template");

    this.task = _task;

    this.setup();
    // this.elementにイベントリスナを追加する。
    this.bindEvents();
  }

  setup() {
    // 挿入した要素の子要素のリストにidを設定
    this.element.querySelector("h2")!.textContent = `${this.task.title}`;
    this.element.querySelector("p")!.textContent = `${this.task.description}`;
  }

  @bound
  clickHandler(): void {
    if (!this.element.parentElement) return;

    // 1. 自身が所属しているul要素のidを見にいく。
    const currentListId = this.element.parentElement.id as TaskStatus;
    const taskStatusIdx = TASK_STATUS.indexOf(currentListId);

    // id が TASK_STATUS に見つからない時（プログラムのバグ）
    if (taskStatusIdx === -1) {
      throw new Error(`タスクステータスが不正です。`);
    }

    // idによって隣のidを決定
    const nextListId = TASK_STATUS[taskStatusIdx + 1];

    if (nextListId) {
      // 2. 隣のidにli要素を挿入
      const nextListEl = document.getElementById(
        nextListId
      ) as HTMLUListElement;
      nextListEl.appendChild(this.element);
      return;
    }

    // もし現在のリストが"done"なら、要素を削除して終了
    this.element.remove();
  }

  bindEvents() {
    this.element.addEventListener("click", this.clickHandler);
  }
}
