import App from "./App";
import { render, screen } from "@testing-library/react";

describe("App", () => {
  it("renders App component", () => {
    render(<App />);

    expect(screen.getByText(/Task List/)).toBeInTheDocument();
  });
});
