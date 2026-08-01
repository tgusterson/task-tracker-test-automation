import { Task } from "@workspace/shared";
import { TaskItem } from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TaskList = ({
  tasks,
  loading,
  error,
  onToggle,
  onDelete,
}: TaskListProps) => {
  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {error && <div className="text-red-50">Error: {error}</div>}
      {tasks.length === 0 ? (
        <div>No tasks available.</div>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};
