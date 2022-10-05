import React, { ReactNode } from "react";
import Paginator from '../components/Paginator';
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import SearchContext from "../context/SearchContext";

const customRender = (component: ReactNode, { providerProps }: any) => {
  return render(
    <SearchContext.Provider value={{...providerProps}}>
      { component }
    </SearchContext.Provider>,
  );
};

describe('Paginator', () => {
    it('renders correct number of page buttons', async () => {
      const providerProps = {
        paginationParams: {
          page: 1,
          pageSize: 5,
        },
        totalResults: 12,
      };
      const numPages = Math.ceil(providerProps.totalResults / providerProps.paginationParams.pageSize);

      customRender(
        <Paginator />,
        { providerProps }
      );

      for (let i = 0; i < numPages; ++i) {
        const pageNum = (i + 1).toString();
        const pageButton = await screen.findByRole('button', {
          name: pageNum,
        });
        expect(pageButton).toBeInTheDocument();
        expect(pageButton.textContent).toEqual(pageNum);
      }
    });
});
