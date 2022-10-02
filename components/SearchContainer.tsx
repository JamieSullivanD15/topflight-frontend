import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import NumberInput from "./NumberInput";
import Dropdown from "./Dropdown";

type Props = {
  cities: Array<string>;
  maxPrice: number;
};

const SearchContainer = ({ cities }: Props) => {
  const { searchParams, handleChange } = useContext(SearchContext);
  const { numPeople } = searchParams;

  return (
    <div>
      <h1>Search Container</h1>
      <NumberInput
        name='numPeople'
        label='Number of Guests'
        minValue={numPeople}
        maxValue={100}
        onChange={handleChange}
      />
      <Dropdown
        name='city'
        label='City'
        options={cities}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchContainer;
