import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import NumberInput from "./NumberInput";
import Dropdown from "./Dropdown";
import PriceRange from "./PriceRange";
import styles from '../styles/SearchContainer.module.scss';

type Props = {
  cities: Array<string>;
  maxPrice: number;
  handleSearch: Function;
};

const SearchContainer = ({ cities, maxPrice, handleSearch }: Props) => {
  // @ts-ignore
  const { searchParams, handleChange } = useContext(SearchContext);
  const { numPeople } = searchParams;

  return (
    <>
      <div className={styles.container}>
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
        <PriceRange label='Price per person' maxPrice={maxPrice} />
      </div>
      <div className={styles.btn__container}>
        <button onClick={() => handleSearch()}>
          Search
        </button>
      </div>
    </>
  );
};

export default SearchContainer;
