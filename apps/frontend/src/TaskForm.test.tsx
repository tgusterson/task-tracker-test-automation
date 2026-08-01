import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TaskForm } from "./TaskForm";

describe("TaskForm", () => {
  it("renders an input and submit button", () => {
    render(<TaskForm onAdd={vi.fn()} />);

    expect(screen.getByLabelText("Task title")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Add Task" }),
    ).toBeInTheDocument();
  });

  it("calls onAdd with the entered title on submit", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("Task title"), "Buy milk");
    await user.click(screen.getByRole("button", { name: "Add Task" }));

    expect(onAdd).toHaveBeenCalledWith("Buy milk");
  });

  it("clears the input after a successful submit", async () => {
    const user = userEvent.setup();
    render(<TaskForm onAdd={vi.fn()} />);
    const input = screen.getByLabelText("Task title");

    await user.type(input, "Buy milk");
    await user.click(screen.getByRole("button", { name: "Add Task" }));

    expect(input).toHaveValue("");
  });

  it("trims whitespace before calling onAdd", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("Task title"), "  Buy milk  ");
    await user.click(screen.getByRole("button", { name: "Add Task" }));

    expect(onAdd).toHaveBeenCalledWith("Buy milk");
  });

  it("does not call onAdd when the input is empty", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAdd={onAdd} />);

    await user.click(screen.getByRole("button", { name: "Add Task" }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("does not call onAdd when the input is only whitespace", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("Task title"), "   ");
    await user.click(screen.getByRole("button", { name: "Add Task" }));

    expect(onAdd).not.toHaveBeenCalled();
  });

  it("submits the form when pressing Enter", async () => {
    const user = userEvent.setup();
    const onAdd = vi.fn();
    render(<TaskForm onAdd={onAdd} />);

    await user.type(screen.getByLabelText("Task title"), "Buy milk{Enter}");

    expect(onAdd).toHaveBeenCalledWith("Buy milk");
  });
});
