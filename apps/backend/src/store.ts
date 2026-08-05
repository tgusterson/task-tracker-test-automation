import { Task } from "@workspace/shared";
import { randomUUID } from "crypto";
import { createConnection } from "./db/connection.js";
import { createTasksTable } from "./db/schema.js";

interface TaskRow {
  id: string;
  title: string;
  completed: number;
}

const dbPath =
  process.env.NODE_ENV === "test"
    ? ":memory:"
    : (process.env.DB_PATH ?? "./data/tasks.db");

const db = createConnection(dbPath);
createTasksTable(db);

const rowToTask = (row: TaskRow): Task => ({
  id: row.id,
  title: row.title,
  completed: !!row.completed,
});

const getTaskById = (id: string): Task | undefined => {
  const row = db
    .prepare("SELECT * FROM tasks WHERE id = ?")
    .get(id) as TaskRow | undefined;
  return row ? rowToTask(row) : undefined;
};

export const resetStore = () => {
  db.exec("DELETE FROM tasks");
};

export const getTasks = (): Task[] => {
  const rows = db.prepare("SELECT * FROM tasks").all() as TaskRow[];
  return rows.map(rowToTask);
};

export const addTask = (title: string): Task => {
  if (!title || typeof title !== "string") {
    throw new Error("Title is required and must be a string");
  }
  const task: Task = {
    id: randomUUID(),
    title,
    completed: false,
  };
  db.prepare("INSERT INTO tasks (id, title, completed) VALUES (?, ?, ?)").run(
    task.id,
    task.title,
    0,
  );
  return task;
};

export const updateTask = (
  id: string,
  updatedTask: Partial<Task>,
): Task | undefined => {
  const current = getTaskById(id);
  if (!current) {
    return undefined;
  }
  const updates = Object.fromEntries(
    Object.entries(updatedTask).filter(([, v]) => v !== undefined),
  ) as Partial<Task>;
  const merged: Task = { ...current, ...updates };
  db.prepare("UPDATE tasks SET title = ?, completed = ? WHERE id = ?").run(
    merged.title,
    merged.completed ? 1 : 0,
    id,
  );
  return merged;
};

export const deleteTask = (id: string) => {
  const result = db.prepare("DELETE FROM tasks WHERE id = ?").run(id);
  return result.changes > 0
    ? { message: `Task with id ${id} deleted` }
    : { message: `Task with id ${id} not found` };
};
