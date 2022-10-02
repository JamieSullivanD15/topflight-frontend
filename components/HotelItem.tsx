import React, { useState } from 'react';
import styles from '../styles/HotelList.module.scss';
import type { Hotel } from "./HotelList";
import Image from 'next/image';

type Props = {
  hotel: Hotel;
};

const HotelItem = ({ hotel }: Props) => {
  const [photo, setPhoto] = useState(hotel.photos[0]);

  return (
    <li>
      <div>
        <div>
          <h1>{hotel.name}</h1>
          <p>{hotel.address}</p>
        </div>
        <div>
          {hotel.stars}
        </div>
      </div>
      <div>
        <div>
          <span>Room description</span>
          <span>Room price</span>
        </div>
        <div>
          <span>Room description</span>
          <span>Room price</span>
        </div>
      </div>
      <div>
        <Image
          src={photo}
          alt={photo}
          width={200}
          height={200}
          placholder='blur'
        />
      </div>
    </li>
  );
}

export default HotelItem;
