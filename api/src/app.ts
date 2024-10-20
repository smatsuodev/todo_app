import cors from "cors";
import {databaseManager} from "@/db/database_manager";
import express from "express";

export const app = express();

app.use(cors());
app.use(express.json());

const statusMap = {
  todo: 0,
  done: 1,
} as const;

app.get("/api/tasks", async (req, res) => {
  const db = await databaseManager.getInstance();
  const result = await db.all(
    "SELECT id, title, status FROM tasks ORDER BY id",
  );
  res.status(200).json(result);
});

app.post("/api/tasks", async (req, res) => {
  const db = await databaseManager.getInstance();
  await db.run(
    "INSERT INTO tasks(title, status) VALUES (?, ?)",
    req.body.title,
    statusMap.todo,
  );
  res.status(200).send();
});

app.post("/api/tasks/:taskId/done", async (req, res) => {
  const db = await databaseManager.getInstance();
  await db.run(
    "UPDATE tasks SET status = ? WHERE tasks.id = ?",
    statusMap.done,
    req.params.taskId,
  );
  res.status(200).send();
});

app.post("/api/tasks/clear", async (req, res) => {
  const db = await databaseManager.getInstance();
  await db.run("DELETE FROM tasks WHERE tasks.status = ?", statusMap.done);
  res.status(200).send();
});