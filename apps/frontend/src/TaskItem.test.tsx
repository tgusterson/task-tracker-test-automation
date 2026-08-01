import { render, screen } from "@testing-library/react";
import { TaskItem } from "./TaskItem";
import userEvent from "@testing-library/user-event";

describe("TaskItem", () => {
  it("renders pending item correctly", () => {
    const task = { id: "1", title: "Test Task", completed: false };
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText("Test Task - Pending")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).not.toBeChecked();
  });

  it("renders completed item correctly", () => {
    const task = { id: "2", title: "Completed Task", completed: true };
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />);

    expect(screen.getByText("Completed Task - Completed")).toBeInTheDocument();
    expect(screen.getByRole("checkbox")).toBeChecked();
  });

  it("calls onToggle when checkbox is clicked", async () => {
    const user = userEvent.setup();
    const task = { id: "1", title: "Test Task", completed: false };
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />);

    await user.click(screen.getByRole("checkbox"));
    expect(onToggle).toHaveBeenCalledWith("1", true);
  });

  it("calls onDelete when delete button is clicked", async () => {
    const user = userEvent.setup();
    const task = { id: "1", title: "Test Task", completed: false };
    const onToggle = vi.fn();
    const onDelete = vi.fn();

    render(<TaskItem task={task} onToggle={onToggle} onDelete={onDelete} />);

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onDelete).toHaveBeenCalledWith("1");
  });
});
