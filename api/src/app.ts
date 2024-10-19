import express from "express";
import {databaseManager} from "./db/database_manager";

export const app = express();

app.use(express.json());

app.get("/api/tasks", async (req, res) => {
  const db = await databaseManager.getInstance();
  const tasks = await db.all<Task>("SELECT * FROM tasks ORDER BY id");
  res.json(tasks);
});

app.post("/api/tasks", async (req, res) => {
  const db = await databaseManager.getInstance();
  await db.exec(
    `INSERT INTO tasks (title, status) VALUES ("${req.body.title}", 0)`,
  );
  res.status(200).send();
});

app.patch("/api/tasks/:taskId", async (req, res) => {
  const id = req.params.taskId;
  const status = req.body.status;
  const db = await databaseManager.getInstance();
  await db.exec(`UPDATE tasks SET status = ${status} WHERE id = ${id}`);
  res.status(200).send();
});

app.delete("/api/tasks/", async (req, res) => {
  const db = await databaseManager.getInstance();
  await db.exec(`DELETE FROM tasks WHERE status = 1`);
  res.status(200).send();
});
