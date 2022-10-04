import React, {useCallback, useEffect, useState, useRef, ChangeEventHandler, useContext, Ref} from "react";
import PropTypes from "prop-types";
import styles from '../styles/PriceRange.module.scss';
import SearchContext from '../context/SearchContext';

type Props = {
  min: number;
  max: number;
};

const MultiRangeSlider = ({ min, max }: Props) => {
  const [minPrice, setMinPrice] = useState(min);
  const [maxPrice, setMaxPrice] = useState(max);
  const minPriceRef: Ref<any> = useRef(min);
  const maxPriceRef: Ref<any> = useRef(max);
  const range: Ref<any> = useRef(null);
  // @ts-ignore
  const { handlePriceChange } = useContext(SearchContext);

  // Convert to percentage
  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    const minPercent = getPercent(minPrice);
    const maxPercent = getPercent(maxPriceRef.current);

    if (range.current) {
      range.current.style.left = `${minPercent}%`;
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minPrice, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    const minPercent = getPercent(minPriceRef.current);
    const maxPercent = getPercent(maxPrice);

    if (range.current) {
      range.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxPrice, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    handlePriceChange(minPrice, maxPrice);
  }, [minPrice, maxPrice]);

  // @ts-ignore
  return (
    <div>
      <input
        type="range"
        min={min}
        max={max}
        value={minPrice}
        onChange={(event) => {
          const value = Math.min(Number(event.target.value), maxPrice - 1);
          setMinPrice(value);
          // @ts-ignore
          minPriceRef.current = value;
        }}
        className={`${styles.thumb} ${styles.thumb__left}`}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={maxPrice}
        onChange={(event) => {
          const value = Math.max(Number(event.target.value), minPrice + 1);
          setMaxPrice(value);
          // @ts-ignore
          maxPriceRef.current = value;
        }}
        className={`${styles.thumb} ${styles.thumb__right}`}
      />

      <div className={styles.slider}>
        <div className={styles.slider__track} />
        <div ref={range} className={styles.slider__range} />
      </div>
    </div>
  );
};

export default MultiRangeSlider;
