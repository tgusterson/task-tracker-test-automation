import { test, expect } from "./fixtures/tasks";

// Loading/error/empty render states for TaskList are covered by component
// tests in apps/frontend/src/TaskList.test.tsx. This file focuses on real
// user flows and wiring against the live API — deliberately not
// re-testing pure rendering logic here, and avoiding assertions on total
// list state (e.g. "list is empty"), which isn't safe against the shared
// backend store when tests run in parallel.

test("user can add, complete, uncomplete, and delete a task", async ({
  page,
}) => {
  await page.goto("/");

  const title = `Buy milk ${Date.now()}`;

  await page.getByLabel("Task title").fill(title);
  await page.getByRole("button", { name: "Add Task" }).click();

  const item = page.getByRole("listitem").filter({ hasText: title });
  await expect(item).toBeVisible();
  await expect(item).toContainText("Pending");

  await item.getByRole("checkbox").check(); // check() itself throws if the checkbox doesn't end up checked; no separate assert needed
  await expect(item).toContainText("Completed");

  await item.getByRole("checkbox").uncheck();
  await expect(item).toContainText("Pending");

  await item.getByRole("button", { name: "Delete" }).click();
  await expect(item).not.toBeVisible();
});

test("task list persists after a page reload", async ({ page }) => {
  await page.goto("/");

  const title = `Buy milk ${Date.now()}`;

  await page.getByLabel("Task title").fill(title);
  await page.getByRole("button", { name: "Add Task" }).click();

  const item = page.getByRole("listitem").filter({ hasText: title });
  await expect(item).toBeVisible();

  await page.reload();

  const itemAfterReload = page.getByRole("listitem").filter({ hasText: title });
  await expect(itemAfterReload).toBeVisible();
});

test("shows an error message when the API returns an error", async ({
  page,
}) => {
  await page.goto("/");

  const title = `Buy milk ${Date.now()}`;

  // Intercept the POST request to /tasks and return a 500 error
  await page.route("**/tasks", (route) => {
    if (route.request().method() !== "POST") return route.continue();
    route.fulfill({
      status: 500,
      contentType: "application/json",
      body: JSON.stringify({ message: "Internal Server Error" }),
    });
  });

  await page.getByLabel("Task title").fill(title);
  await page.getByRole("button", { name: "Add Task" }).click();

  const errorMessage = page.getByText(/Internal Server Error/);
  await expect(errorMessage).toBeVisible();
});

test("does not add a task when the title is empty", async ({ page }) => {
  await page.goto("/");

  const addedRequest = page.waitForRequest(
    (req) => req.url().endsWith("/tasks") && req.method() === "POST",
    { timeout: 1000 },
  ).then(() => true).catch(() => false);

  await page.getByLabel("Task title").fill("");
  await page.getByRole("button", { name: "Add Task" }).click();

  expect(await addedRequest).toBe(false);
});

test("does not add a task when the title is only whitespace", async ({
  page,
}) => {
  await page.goto("/");

  const addedRequest = page.waitForRequest(
    (req) => req.url().endsWith("/tasks") && req.method() === "POST",
    { timeout: 1000 },
  ).then(() => true).catch(() => false);

  await page.getByLabel("Task title").fill("   ");
  await page.getByRole("button", { name: "Add Task" }).click();

  expect(await addedRequest).toBe(false);
});

test("does not delete wrong task when multiple tasks have the same title", async ({
  page,
}) => {
  await page.goto("/");

  const title = `Buy milk ${Date.now()}`;

  await page.getByLabel("Task title").fill(title);
  await page.getByRole("button", { name: "Add Task" }).click();
  await page.getByLabel("Task title").fill(title);
  await page.getByRole("button", { name: "Add Task" }).click();

  const items = page.getByRole("listitem").filter({ hasText: title });
  await expect(items).toHaveCount(2);

  // Mark the second task completed so it's distinguishable from the first
  await items.nth(1).getByRole("checkbox").check();
  await expect(items.nth(1)).toContainText("Completed");

  // Delete the first (still-pending) task
  await items.nth(0).getByRole("button", { name: "Delete" }).click();

  const remaining = page.getByRole("listitem").filter({ hasText: title });
  await expect(remaining).toHaveCount(1);
  await expect(remaining).toContainText("Completed"); // proves the SECOND task survived, not just "a" task
});
