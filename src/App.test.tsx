import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders the CollegeScore title", () => {
  render(<App />);
  // We look for the "CollegeScore" text that we know is in your Header
  const titleElement = screen.getByText(/CollegeScore/i);
  expect(titleElement).toBeInTheDocument();
});

test("renders the Add a Review button", () => {
  render(<App />);
  // This checks that your new reusable component is showing up
  const buttonElement = screen.getByText(/Add a Review/i);
  expect(buttonElement).toBeInTheDocument();
});
