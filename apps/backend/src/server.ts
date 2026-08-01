import express from "express";
import cors from "cors";
import { addTask, deleteTask, getTasks, updateTask } from "./store";

export const app: express.Express = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Root endpoint to check if the API is running
app.get("/", (_req, res) => {
  res.json({ message: "API running" });
});

// CRUD endpoints for tasks
app.get("/tasks", (_req, res) => {
  res.json(getTasks());
});

app.post("/tasks", (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== "string") {
    return res
      .status(400)
      .json({ message: "Title is required and must be a string" });
  }
  const task = addTask(title);
  res.status(201).json(task);
});

app.patch("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { title, completed } = req.body;
  const task = updateTask(id, { title, completed });
  if (!task) {
    return res.status(404).json({ message: `Task with id ${id} not found` });
  }
  res.json(task);
});

app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const deleteResponse = deleteTask(id);
  const deleteMsg = deleteResponse.message;
  if (deleteMsg.includes("deleted")) {
    res.json({ message: deleteMsg });
  }
  return res.status(404).json({ message: deleteMsg });
});

// Gate listen by environment variable to avoid issues during testing
if (process.env.NODE_ENV !== "test") {
  // Start the server
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
