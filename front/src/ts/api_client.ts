import {Task} from "./task";

class ApiClient {
  async getTasks(): Promise<Task[]> {
    const response = await fetch(`/api/tasks`);
    if (!response.ok) {
      throw new Error("get tasks failed");
    }
    const tasks = (await response.json()) as Task[];
    return tasks;
  }

  async createTask(title: string): Promise<void> {
    const response = await fetch(`/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title}),
    });
    if (!response.ok) throw new Error("create task failed");
  }

  async doneTask(taskId: number): Promise<void> {
    const response = await fetch(`/api/tasks/${taskId}/done`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("done task failed");
  }

  async clearDoneTasks(): Promise<void> {
    const response = await fetch(`/api/tasks/clear`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("clear done tasks failed");
  }
}

export const client = new ApiClient();