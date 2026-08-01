import { render, screen } from "@testing-library/react";
import { TaskList } from "./TaskList";

describe("TaskList", () => {
  it("renders loading state", () => {
    render(
      <TaskList
        tasks={[]}
        loading={true}
        error={null}
        onToggle={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });
  it("renders error state", () => {
    render(
      <TaskList
        tasks={[]}
        loading={false}
        error="Failed to load tasks"
        onToggle={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("Error: Failed to load tasks")).toBeInTheDocument();
  });
  it("renders empty state", () => {
    render(
      <TaskList
        tasks={[]}
        loading={false}
        error={null}
        onToggle={() => {}}
        onDelete={() => {}}
      />,
    );
    expect(screen.getByText("No tasks available.")).toBeInTheDocument();
  });
  it("renders a list of tasks", () => {
    const tasks = [
      { id: "1", title: "Task 1", completed: false },
      { id: "2", title: "Task 2", completed: true },
    ];
    render(
      <TaskList
        tasks={tasks}
        loading={false}
        error={null}
        onToggle={() => {}}
        onDelete={() => {}}
      />,
    );
    const items = screen.getAllByRole("listitem");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveTextContent("Task 1 - Pending");
    expect(items[1]).toHaveTextContent("Task 2 - Completed");
  });
});
