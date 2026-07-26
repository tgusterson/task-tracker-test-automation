import { Task } from "@workspace/shared";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const TaskList = ({ tasks, loading, error }: TaskListProps) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (tasks.length === 0) return <div>No tasks available.</div>;
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.title} - {task.completed ? "Completed" : "Pending"}
        </li>
      ))}
    </ul>
  );
};

TaskList.displayName = "TaskList";
