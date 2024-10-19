const API_URL = "http://localhost:3000";

export class Application {
  start = async (): Promise<void> => {
    this.showWelcomeMessageIfNecessary();
    await this.syncTodo();
    this.setListeners();
    return;
  };

  showWelcomeMessageIfNecessary = async () => {
    if (localStorage.getItem("alert") === null) {
      alert("Welcome to TODO APP");
      localStorage.setItem("alert", "true");
    }
  };

  setListeners = () => {
    addEventListener("submit", async e => {
      e.preventDefault();
      const title = (
        document.getElementById("new-todo-title") as
          | HTMLInputElement
          | undefined
      )?.value;
      if (title === undefined) return;
      await this.addTodo(title);
    });
    document
      .getElementById("clear-button")
      ?.addEventListener("click", async e => {
        await this.deleteDoneTodo();
      });
  };

  syncTodo = async () => {
    const res = await this.fetch("/api/tasks");
    const tasks = await res.json();
    const e = document.getElementById("task-list-container");
    if (!e) return;
    e.innerHTML = "";
    for (const task of tasks) {
      const li = document.createElement("li");
      li.className = `task task--${task["status"] === 1 ? "done" : "todo"}`;

      const doneButton = document.createElement("div");
      doneButton.className = "task__btn";
      doneButton.onclick = () => this.doneTodo(task.id);
      li.appendChild(doneButton);

      const titleDiv = document.createElement("div");
      titleDiv.setAttribute("data-test", "task-title");
      titleDiv.className = "task__title";
      titleDiv.appendChild(document.createTextNode(task["title"]));
      li.appendChild(titleDiv);

      e.appendChild(li);
    }
  };

  addTodo = async (title: string) => {
    await this.fetch("/api/tasks", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({title}),
    });
    await this.syncTodo();
  };

  doneTodo = async (id: number) => {
    await this.fetch(`/api/tasks/${id}`, {
      method: "PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({status: 1}),
    });
    await this.syncTodo();
  };

  deleteDoneTodo = async () => {
    await this.fetch(`/api/tasks/`, {
      method: "DELETE",
    });
    await this.syncTodo();
  };

  private fetch = async (
    input: string,
    init?: RequestInit,
  ): Promise<Response> => fetch(`${API_URL}${input}`, init);
}
