import React from "react";

interface TaskFormProps {
  onAdd: (title: string) => void;
}

export const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [title, setTitle] = React.useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        aria-label="Task title"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
