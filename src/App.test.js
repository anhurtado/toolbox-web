import { render, screen } from '@testing-library/react';
import App from './App';

test('renders toolbar with title React App', () => {
  render(<App />);
  const toolbarTitle = screen.getByText(/React App/i);
  expect(toolbarTitle).toBeInTheDocument();
});

test('renders select with first option All', () => {
  render(<App />);
  const selectElement = screen.getByRole('combobox');
  const firstOption = screen.getByText(/All/i);
  expect(selectElement.firstChild).toBe(firstOption);
});

test('renders table with appropriate headers', () => {
  render(<App />);
  const tableElement = screen.getByRole('table');
  const fileNameHeader = screen.getByText('File Name');
  const textHeader = screen.getByText('Text');
  const numberHeader = screen.getByText('Number');
  const hexHeader = screen.getByText('Hex');

  expect(tableElement).toContainElement(fileNameHeader);
  expect(tableElement).toContainElement(textHeader);
  expect(tableElement).toContainElement(numberHeader);
  expect(tableElement).toContainElement(hexHeader);
});