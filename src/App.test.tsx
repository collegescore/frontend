import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// These tests are temporary to verify that circleci is running tests correctly. 
// They should be replaced once we have updated App.tsx with its actual content.

test('renders the Header component', () => {
  render(<App />);
  // Your console output shows "<header>Header!</header>"
  const headerElement = screen.getByText(/Header!/i);
  expect(headerElement).toBeInTheDocument();
});

test('renders the main typography section', () => {
  render(<App />);
  // Your console output shows "<h1>H1</h1>"
  const h1Element = screen.getByText(/H1/i);
  expect(h1Element).toBeInTheDocument();
});

test('renders a primary contained button', () => {
  render(<App />);
  // Your console output shows "Contained Primary"
  const buttonElement = screen.getByText(/Contained Primary/i);
  expect(buttonElement).toBeInTheDocument();
});