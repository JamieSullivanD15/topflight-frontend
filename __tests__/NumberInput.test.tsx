import NumberInput from '../components/NumberInput';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

describe('NumberInput', () => {
  it('renders a label and input with min value', () => {
    const minValue = 0;
    const label = 'Number of Guests';

    render(
      <NumberInput
        name='numPeople'
        label={label}
        minValue={minValue}
        maxValue={100}
        onChange={() => {}}
      />
    )

    const labelElement = screen.getByText(label);
    const inputElement = screen.getByDisplayValue(minValue);

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });
});
