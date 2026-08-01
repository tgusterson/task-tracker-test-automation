import App from "./App";
import { render, screen } from "@testing-library/react";
import * as api from "./api";

vi.mock("./api");

describe("App", () => {
  it("renders task list after successful load", async () => {
    vi.mocked(api.getTasks).mockResolvedValue([
      { id: "1", title: "Task 1", completed: false },
      { id: "2", title: "Task 2", completed: true },
    ]);

    render(<App />);

    expect(await screen.findByText(/Task List/i)).toBeInTheDocument();
  });

  it("displays error message on API failure", async () => {
    vi.mocked(api.getTasks).mockRejectedValue(new Error("API Error"));

    render(<App />);

    expect(await screen.findByText(/API Error/i)).toBeInTheDocument();
  });
});
