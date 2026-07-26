import { Task } from "@workspace/shared";
import { randomUUID } from "crypto";

let tasks: Task[] = [];

export const resetStore = () => {
  tasks = [];
};
export const getTasks = () => tasks;
export const addTask = (title: string) => {
  if (!title || typeof title !== "string") {
    throw new Error("Title is required and must be a string");
  }
  const task: Task = {
    id: randomUUID(),
    title,
    completed: false,
  };
  tasks.push(task);
  return task;
};
export const updateTask = (id: string, updatedTask: Partial<Task>) => {
  const updates = Object.fromEntries(
    Object.entries(updatedTask).filter(([, v]) => v !== undefined),
  ) as Partial<Task>;
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updates } : task,
  );
  return tasks.find((task) => task.id === id);
};
export const deleteTask = (id: string) => {
  tasks = tasks.filter((task) => task.id !== id);
  if (!tasks.find((task) => task.id === id)) {
    return { message: `Task with id ${id} deleted` };
  }
  return { message: `Task with id ${id} not found` };
};
