import { UIComponent } from "./UIComponent.js";

export const TASK_STATUS = ["todo", "working", "done"] as const;
export type TaskStatus = typeof TASK_STATUS[number];

export class TaskList extends UIComponent<HTMLDivElement> {
  constructor(private taskStatus: TaskStatus) {
    super("#task-list-template");

    this.setup();

    // this.element.id = `${this.taskStatus}-tasks`;
  }

  setup() {
    this.element.querySelector("h2")!.textContent = `${this.taskStatus}`;
    // 挿入した要素の子要素のリストにidを設定
    this.element.querySelector("ul")!.id = `${this.taskStatus}`;
  }
}
