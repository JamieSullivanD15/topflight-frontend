import React, { useState } from 'react';
import styles from '../styles/HotelList.module.scss';
import elementStyles from '../styles/Elements.module.scss';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import {forEachComment} from "tsutils";
import { type Hotel } from "../context/SearchContext";

type Props = {
  hotel: Hotel;
};

const HotelItem = ({ hotel }: Props) => {
  // @ts-ignore
  const [photoIndex, setPhotoIndex] = useState(0);
  const hasRooms = hotel.roomTypes.some((roomType: any) => (
    roomType.length > 0
  ));

  const getStars = () => {
    let stars = [];
    for (let i = 0; i < hotel.stars; ++i) {
      stars.push(<FontAwesomeIcon icon={faStar} className={styles.star} size='lg' key={i} />);
    }
    return stars;
  };

  return (
    <li className={styles.hotel__item}>
      <div className={styles.hotel__item__info}>
        <div className={styles.hotel__item__heading}>
          <div>
            <h1>{hotel.name}</h1>
            <p>{hotel.address}</p>
          </div>
          <div className={styles.hotel__item__stars}>
            { getStars() }
          </div>
        </div>
        <div>
          <div>
            {
              hasRooms
                ? hotel.roomTypes.map((roomType: any) => (
                    roomType.map((roomCombo: any, i: number) => (
                      <div key={i} className={styles.hotel__item__rooms}>
                        <span>
                          { roomCombo.description }
                        </span>
                        <span>
                          { roomCombo.price }
                          {'€ / night'}
                        </span>
                      </div>
                    ))
                  ))
                : <span>No rooms available</span>
            }
          </div>
        </div>
      </div>
      <div className={styles.photos__container}>
        <button
          className={elementStyles.iconButton}
          onClick={() => {
            if (photoIndex === 0) {
              setPhotoIndex(hotel.photos.length - 1);
            } else {
              setPhotoIndex(photoIndex - 1);
            }
          }}
        >
          <FontAwesomeIcon icon={faCaretLeft} className={styles.arrow} />
        </button>
        <Image
          src={hotel.photos[photoIndex]}
          alt={hotel.photos[photoIndex]}
          width={200}
          height={200}
        />
        <button
          className={elementStyles.iconButton}
          onClick={() => {
            if (photoIndex === hotel.photos.length - 1) {
              setPhotoIndex(0);
            } else {
              setPhotoIndex(photoIndex + 1);
            }
          }}
        >
          <FontAwesomeIcon icon={faCaretRight} className={styles.arrow} />
        </button>
      </div>
    </li>
  );
}

export default HotelItem;
