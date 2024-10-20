import {client} from "./api_client";
import {renderer} from "./renderer";
import {Task} from "./task";

export const handleSubmitForm = async (e: Event): Promise<void> => {
  e.preventDefault();

  const inputTitleEl = document.querySelector(
    ".form__title",
  ) as HTMLInputElement;
  if (!inputTitleEl.value) return;

  await client.createTask(inputTitleEl.value);
  inputTitleEl.value = "";

  const tasks = await client.getTasks();
  renderer.render(tasks);
};

export const handleClickDoneBtn = async (task: Task): Promise<void> => {
  await client.doneTask(task.id);

  const tasks = await client.getTasks();
  renderer.render(tasks);
};

export const handleClickClearBtn = async (): Promise<void> => {
  await client.clearDoneTasks();

  const tasks = await client.getTasks();
  renderer.render(tasks);
};