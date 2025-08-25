import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the main app container', () => {
  render(<App />);
  const appElement = screen.getByRole('main');
  expect(appElement).toBeInTheDocument();
});
