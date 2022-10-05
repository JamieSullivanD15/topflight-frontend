import React from "react";
import Select from '../components/Select';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';

describe('Select', () => {
    it('renders a label', () => {
      const label = 'City';

      render(
        <Select
          name='city'
          label={label}
          options={['test']}
          onChange={() => {}}
        />
      );

      const labelElement = screen.getByText(label);
      expect(labelElement).toBeInTheDocument();
    });
});

describe('Select', () => {
  it('renders a select with default value', () => {
    const defaultOption = 'Choose city';

    render(
      <Select
        name='city'
        label='City'
        defaultOption={defaultOption}
        options={['test']}
        onChange={() => {}}
      />
    );

    const defaultOptionElement = screen.getByDisplayValue(defaultOption);
    expect(defaultOptionElement).toBeInTheDocument();
  });
});

describe('Select', () => {
  it('renders a select with no default value', () => {
    const option = 'test';

    render(
      <Select
        name='city'
        label='City'
        options={[option]}
        onChange={() => {}}
      />
    );

    const noValueOptionElement = screen.getByDisplayValue(option);
    expect(noValueOptionElement).toBeInTheDocument();
  });
});
