import {client} from "./api_client";
import {handleSubmitForm, handleClickClearBtn} from "./event_handler"
import {renderer} from "./renderer"

export class Application {
  start = async (): Promise<void> => {
    const messageKey = "hasShownWelcomeMessage";
    if (!localStorage.getItem(messageKey)) {
      window.alert("Welcome to TODO APP");
      localStorage.setItem(messageKey, "yes");
    }

    const formEl = document.querySelector(".form") as HTMLElement;
    formEl.addEventListener("submit", handleSubmitForm);

    const clearBtnEl = document.querySelector(".clear__btn") as HTMLElement;
    clearBtnEl.addEventListener("click", handleClickClearBtn);

    const tasks = await client.getTasks();
    renderer.render(tasks);
  };
}