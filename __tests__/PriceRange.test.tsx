import React, { ReactNode } from "react";
import PriceRange from '../components/PriceRange';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import SearchContext from "../context/SearchContext";

const providerProps = {
  searchParams: {
    minPrice: 0,
    maxPrice: 100,
  },
  handlePriceChange: () => {},
};

const customRender = (component: ReactNode) => {
  return render(
    <SearchContext.Provider value={{...providerProps}}>
      { component }
    </SearchContext.Provider>,
  );
};

describe('PriceRange', () => {
    it('renders correct label', async () => {
      const label = 'Price per person';

      customRender(
        <PriceRange
          label={label}
          maxPriceValue={100}
        />
      );

      const labelElement = screen.getByText(label);
      expect(labelElement).toBeInTheDocument();
      expect(labelElement.textContent).toEqual(label);
    });
});

describe('PriceRange', () => {
  it('renders min and max value', async () => {
    const label = 'Price per person';

    customRender(
      <PriceRange
        label={label}
        maxPriceValue={100}
      />
    );

    const minValueElement = screen.getByText(providerProps.searchParams.minPrice);
    const maxValueElement = screen.getByText(providerProps.searchParams.maxPrice);
    expect(minValueElement).toBeInTheDocument();
    expect(maxValueElement).toBeInTheDocument();
  });
});
