import React, { ReactNode } from "react";
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import SearchContext from "../context/SearchContext";
import SearchContainer from "../components/SearchContainer";

const customRender = (component: ReactNode) => {
  const providerProps = {
    searchParams: {
      minPrice: 0,
      maxPrice: 100,
    },
    handlePriceChange: () => {},
  };

  return render(
    <SearchContext.Provider value={{...providerProps}}>
      { component }
    </SearchContext.Provider>,
  );
};

describe('SearchContainer', () => {
    it('renders error message', () => {
      customRender(
        <SearchContainer
          cities={['dublin', 'madrid']}
          maxPriceValue={100}
          handleSearch={() => {}}
          handleChange={() => {}}
          showError
        />
      );

      const errorMessage = screen.getByText('Please select a value for all fields');
      expect(errorMessage).toBeInTheDocument();
    });
});

describe('SearchContainer', () => {
  it('renders search button', () => {
    customRender(
      <SearchContainer
        cities={['dublin', 'madrid']}
        maxPriceValue={100}
        handleSearch={() => {}}
        handleChange={() => {}}
        showError
      />
    );

    const searchButton = screen.getByRole('button', { name: 'Search' });
    expect(searchButton).toBeInTheDocument();
  });
});
