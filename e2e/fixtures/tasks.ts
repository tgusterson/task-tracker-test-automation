import { test as base, expect } from "@playwright/test";

const API_BASE = process.env.VITE_API_URL ?? "http://localhost:3000";

export const test = base.extend({
  page: async ({ page }, use) => {
    const createdTaskIds: string[] = [];

    page.on("response", async (response) => {
      if (
        response.request().method() !== "POST" ||
        !response.url().endsWith("/tasks") ||
        !response.ok()
      ) {
        return;
      }
      const body = await response.json().catch(() => null);
      if (body?.id) createdTaskIds.push(body.id);
    });

    await use(page);

    await Promise.allSettled(
      createdTaskIds.map((id) =>
        fetch(`${API_BASE}/tasks/${id}`, { method: "DELETE" }),
      ),
    );
  },
});

export { expect };
