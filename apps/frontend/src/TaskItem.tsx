import { Task } from "@workspace/shared";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onDelete }: TaskItemProps) => (
  <li>
    <input
      type="checkbox"
      checked={task.completed}
      onChange={(e) => onToggle(task.id, e.target.checked)}
    />
    {task.title} - {task.completed ? "Completed" : "Pending"}
    <button onClick={() => onDelete(task.id)}>Delete</button>
  </li>
);
