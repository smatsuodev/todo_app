import {handleClickDoneBtn} from "./event_handler";
import {Task, statusMap} from "./task";

class Renderer {
  private readonly taskListEl: HTMLElement;

  constructor(taskListEl: HTMLElement) {
    this.taskListEl = taskListEl;
  }

  render = (tasks: Task[]): void => {
    this.taskListEl.replaceChildren();
    const tasksEl = tasks.map(task => this.buildTaskEl(task));
    this.taskListEl.append(...tasksEl);
  };

  private buildTaskEl = (task: Task): HTMLElement => {
    const taskEl = document.createElement("li");

    if (task.status === statusMap.todo) {
      taskEl.className = "task task--todo";
    } else if (task.status === statusMap.done) {
      taskEl.className = "task task--done";
    }

    const btnEl = document.createElement("div");
    btnEl.className = "task__btn";
    if (task.status === statusMap.todo) {
      btnEl.addEventListener("click", () => handleClickDoneBtn(task), {
        once: true,
      });
    }

    const titleEl = document.createElement("div");
    titleEl.innerText = task.title;
    titleEl.className = "task__title";
    titleEl.dataset.test = "task-title";

    taskEl.append(btnEl, titleEl);

    return taskEl;
  };
}

export const renderer = new Renderer(
  document.querySelector(".task-list") as HTMLElement,
);
