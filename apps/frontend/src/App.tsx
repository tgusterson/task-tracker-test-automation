import React from "react";
import { Task } from "@workspace/shared";
import { addTask, getTasks } from "./api";
import { TaskList } from "./TaskList";

const App = () => {
  const [tasks, setTasks] = React.useState<Task[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);

  const onAddTask = () => {
    const title = prompt("Enter task title:");
    if (title) {
      setLoading(true);
      addTask(title)
        .then((newTask) => setTasks((prev) => [...prev, newTask]))
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
    }
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
      <button onClick={onAddTask}>Add Task</button>
      <TaskList tasks={tasks} loading={loading} error={error} />
    </div>
  );
};

export default App;
