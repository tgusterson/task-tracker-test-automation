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
  if (loading) return <div className="text-gray-500">Loading...</div>;

  return (
    <div>
      {error && (
        <div className="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
          Error: {error}
        </div>
      )}
      {tasks.length === 0 ? (
        <div className="text-gray-500">No tasks available.</div>
      ) : (
        <ul className="divide-y divide-gray-200">
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
