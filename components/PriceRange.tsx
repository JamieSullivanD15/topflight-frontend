import React, {ChangeEventHandler, useContext} from 'react';
import MultiRangeSlider from "./MultiRangeSlider";
import styles from '../styles/PriceRange.module.scss';
import SearchContext from "../context/SearchContext";

type Props = {
  label: string;
  maxPrice: number;
};

const PriceRange = ({ label, maxPrice }: Props) => {

  return (
    <div className={styles.container}>
      <label>
        { label }
      </label>
      <MultiRangeSlider
        min={0}
        max={maxPrice}
      />
    </div>
  );
};

export default PriceRange;
