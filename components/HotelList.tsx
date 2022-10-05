import React from 'react';
import styles from '../styles/HotelList.module.scss';
import HotelItem from "./HotelItem";
import { type Hotel } from "../context/SearchContext";

type Props = {
  hotels: Array<Hotel>;
  showNoResults: boolean;
};

const HotelList = ({ hotels, showNoResults }: Props) => (
  <ul className={styles.hotel__list}>
    {
      showNoResults
        ? <h2>No results</h2>
        : (
          hotels.map(hotel => (
            <article className={styles.card} key={hotel.id}>
              <HotelItem hotel={hotel} />
            </article>
          ))
        )
    }
  </ul>
);

export default HotelList;
