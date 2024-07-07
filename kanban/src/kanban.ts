import { TaskForm } from "./models/TaskForm.js";
import { TaskList } from "./models/TaskList.js";
import { TASK_STATUS } from "./models/TaskList.js";
   
// 入力フォームの生成
new TaskForm();

// タスクリストの生成
TASK_STATUS.forEach((status) => {
  const list = new TaskList(status);
  list.mount("#container");
});
