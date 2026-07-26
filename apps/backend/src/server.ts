import express from "express";
import { addTask, deleteTask, getTasks, updateTask } from "./store";

const app = express();
const PORT = 3000;

// Middleware to parse JSON request bodies
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
  deleteTask(id);
  res.json({ message: `Task with id ${id} deleted` });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
