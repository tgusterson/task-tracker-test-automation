import { describe, it, expect, beforeEach } from "vitest";
import * as store from "./store";

describe("Task Store", () => {
  beforeEach(() => {
    // Reset the store before each test
    store.resetStore();
  });

  it("should add a task", () => {
    const task = store.addTask("Test Task");
    expect(task).toHaveProperty("id");
    expect(task.title).toBe("Test Task");
  });

  it("should reject an empty title", () => {
    expect(() => store.addTask("")).toThrow();
  });

  it("should reject a non-string title", () => {
    expect(() => store.addTask(123 as unknown as string)).toThrow();
  });

  it("should have a unique id for each task", () => {
    const task1 = store.addTask("Task 1");
    const task2 = store.addTask("Task 2");
    expect(task1.id).not.toBe(task2.id);
  });

  it("should return an empty array when no tasks are added", () => {
    const tasks = store.getTasks();
    expect(tasks).toEqual([]);
  });

  it("should return all added tasks", () => {
    const task1 = store.addTask("Task 1");
    const task2 = store.addTask("Task 2");
    const tasks = store.getTasks();
    expect(tasks).toEqual([task1, task2]);
  });

  it("should update a task", () => {
    const task = store.addTask("Task to Update");
    const updatedTask = store.updateTask(task.id, {
      title: "Updated Task",
      completed: true,
    });
    expect(updatedTask).toEqual({
      id: task.id,
      title: "Updated Task",
      completed: true,
    });
  });

  it("should not update a non-existent task", () => {
    const task = store.addTask("Task to Update");
    store.updateTask("non-existent-id", { title: "Updated Task" });
    const tasks = store.getTasks();
    expect(tasks).toEqual([task]);
  });

  it("should delete a task", () => {
    const task = store.addTask("Task to Delete");
    store.deleteTask(task.id);
    const tasks = store.getTasks();
    expect(tasks).toEqual([]);
  });

  it("should not delete a non-existent task", () => {
    const task = store.addTask("Task to Delete");
    store.deleteTask("non-existent-id");
    const tasks = store.getTasks();
    expect(tasks).toEqual([task]);
  });
});
