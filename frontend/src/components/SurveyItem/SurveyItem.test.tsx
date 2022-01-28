import { render, screen } from '@testing-library/react';
import SurveyItem from '.';

test('renders learn react link', () => {
  render(<SurveyItem code="tata" name="toto" />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
