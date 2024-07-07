
export const TASK_STATUS = ["todo", "working", "done"] as const;

export type TaskStatus = typeof TASK_STATUS[number];


export type Task = {
  title: string;
  description: string;
};

export type ClickableElement = {
  element: HTMLElement;
  clickHandler(event: MouseEvent): void;
  bindEvents(): void;
}
