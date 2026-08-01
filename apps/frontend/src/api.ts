import { Task } from "@workspace/shared";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export async function getTasks(signal?: AbortSignal): Promise<Task[]> {
  const response = await fetch(`${BASE}/tasks`, { signal });
  return response.json();
}

export async function addTask(title: string): Promise<Task> {
  const response = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return response.json();
}

export async function updateTask(
  id: string,
  updates: { title?: string; completed?: boolean },
): Promise<Task> {
  const response = await fetch(`${BASE}/tasks/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates),
  });
  return response.json();
}

export async function deleteTask(id: string): Promise<{ message: string }> {
  const response = await fetch(`${BASE}/tasks/${id}`, {
    method: "DELETE",
  });
  return response.json();
}
