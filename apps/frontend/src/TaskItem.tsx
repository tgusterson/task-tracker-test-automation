import { Task } from "@workspace/shared";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => (
  <li className="flex items-center gap-3 py-2">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={(e) => onToggle(task.id, e.target.checked)}
      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
    />
    <span
      className={
        task.completed ? "flex-1 text-gray-400 line-through" : "flex-1 text-gray-900"
      }
    >
      {task.title} - {task.completed ? "Completed" : "Pending"}
    </span>
    <button
      onClick={() => onDelete(task.id)}
      className="rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-50"
    >
      Delete
    </button>
  </li>
);
