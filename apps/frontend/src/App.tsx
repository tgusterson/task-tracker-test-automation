import React from "react";
import { Task } from "@workspace/shared";
import { addTask, deleteTask, getTasks, updateTask } from "./api";
import { TaskForm } from "./TaskForm";
import { TaskList } from "./TaskList";

const App = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const onAddTask = (title: string) => {
    addTask(title)
      .then((newTask) => setTasks((prev) => [...prev, newTask]))
      .catch((err) => setError(err.message));
  };

  const onToggle = (id: string, completed: boolean) => {
    updateTask(id, { completed })
      .then((updated) =>
        setTasks((prev) => prev.map((t) => (t.id === updated.id ? updated : t))),
      )
      .catch((err) => setError(err.message));
  };

  const onDelete = (id: string) => {
    deleteTask(id)
      .then(() => setTasks((prev) => prev.filter((t) => t.id !== id)))
      .catch((err) => setError(err.message));
  };

  React.useEffect(() => {
    const controller = new AbortController();

    getTasks(controller.signal)
      .then(setTasks)
      .catch((err) => {
        if (err.name !== "AbortError") setError(err.message);
      })
      .finally(() => setLoading(false));

    return () => controller.abort();
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <TaskForm onAdd={onAddTask} />
      <TaskList
        tasks={tasks}
        loading={loading}
        error={error}
        onToggle={onToggle}
        onDelete={onDelete}
      />
    </div>
  );
};

export default App;
