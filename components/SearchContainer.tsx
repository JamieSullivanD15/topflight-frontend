import React, { useContext } from 'react';
import SearchContext from "../context/SearchContext";
import NumberInput from "./NumberInput";
import Select from "./Select";
import PriceRange from "./PriceRange";
import styles from '../styles/SearchContainer.module.scss';
import elementStyles from '../styles/Elements.module.scss';

type Props = {
  cities: Array<string>;
  maxPriceValue: number;
  handleSearch: Function;
  showError: boolean;
};

const SearchContainer = ({ cities, maxPriceValue, handleSearch, showError }: Props) => {
  // @ts-ignore
  const { handleChange } = useContext(SearchContext);

  return (
    <>
      <div className={styles.container}>
        <NumberInput
          name='numPeople'
          label='Number of Guests'
          minValue={0}
          maxValue={100}
          onChange={handleChange}
        />
        <Select
          name='city'
          label='City'
          options={cities}
          defaultOption='Choose city'
          onChange={handleChange}
        />
        <PriceRange label='Price per person' maxPriceValue={maxPriceValue} />
      </div>
      <div className={styles.btn__container}>
        <button onClick={() => handleSearch()} className={elementStyles.button}>
          Search
        </button>
        {
          showError && <span className={styles.error}>Please select a value for all fields</span>
        }
      </div>
    </>
  );
};

export default SearchContainer;
