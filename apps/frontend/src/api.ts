import { Task } from "@workspace/shared";

const BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function handleResponse<T>(
  response: Response,
  fallbackMessage: string = "Request failed",
): Promise<T> {
  if (!response.ok) {
    const body = await response.json().catch(() => null);
    throw new Error(
      body?.message ?? `${fallbackMessage}: ${response.statusText}`,
    );
  }
  return response.json();
}

export async function getTasks(signal?: AbortSignal): Promise<Task[]> {
  const response = await fetch(`${BASE}/tasks`, { signal });
  return handleResponse(response, "Failed to fetch tasks");
}

export async function addTask(title: string): Promise<Task> {
  const response = await fetch(`${BASE}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return handleResponse(response, "Failed to add task");
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
  return handleResponse(response, "Failed to update task");
}

export async function deleteTask(id: string): Promise<{ message: string }> {
  const response = await fetch(`${BASE}/tasks/${id}`, {
    method: "DELETE",
  });
  return handleResponse(response, "Failed to delete task");
}
