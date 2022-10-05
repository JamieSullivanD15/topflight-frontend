import React, {ChangeEventHandler, useContext} from 'react';
import MultiRangeSlider from "./MultiRangeSlider";
import styles from '../styles/PriceRange.module.scss';
import SearchContext from "../context/SearchContext";

type Props = {
  label: string;
  maxPriceValue: number;
};

const PriceRange = ({ label, maxPriceValue }: Props) => {
  // @ts-ignore
  const { searchParams } = useContext(SearchContext);
  const { minPrice, maxPrice } = searchParams;

  return (
    <div className={styles.container}>
      <label>
        { label }
      </label>
      <MultiRangeSlider
        min={0}
        max={maxPriceValue}
      />
      <div className={styles.values}>
        <div className={styles.slider__left_value}>
          { minPrice }
        </div>
        {' - '}
        <div className={styles.slider__right_value}>
          { maxPrice }
        </div>
        <div>
          €
        </div>
      </div>
    </div>
  );
};

export default PriceRange;
