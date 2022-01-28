import { render, screen } from '@testing-library/react';
import Survey from '.';

test('renders learn react link', () => {
  render(<Survey />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
