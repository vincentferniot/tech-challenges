import { render, screen } from '@testing-library/react';
import Surveys from '.';

test('renders learn react link', () => {
  render(<Surveys />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
