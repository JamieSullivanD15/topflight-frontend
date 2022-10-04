import React from 'react';
import styles from '../styles/HotelList.module.scss';
import HotelItem from "./HotelItem";

export type Hotel = {
  id: number;
  name: string;
  stars: number;
  city: string;
  address: string;
  photos: Array<string>;
  roomTypes: Array<RoomType>;
};

export type RoomType = {
  typeName: string;
  pricePerPerson: number;
  maxPeople: number;
  numRoomsAvailable: number;
};

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
