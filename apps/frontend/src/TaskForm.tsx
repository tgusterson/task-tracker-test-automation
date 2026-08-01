import React from "react";

interface TaskFormProps {
  onAdd: (title: string) => void;
}

export const TaskForm = ({ onAdd }: TaskFormProps) => {
  const [title, setTitle] = React.useState("");

  const onSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;
    onAdd(trimmed);
    setTitle("");
  };

  return (
    <form onSubmit={onSubmit} className="mb-4 flex gap-2">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        aria-label="Task title"
        className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      <button
        type="submit"
        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
      >
        Add Task
      </button>
    </form>
  );
};
