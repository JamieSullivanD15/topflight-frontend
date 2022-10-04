import React, {useContext, useState} from 'react';
import styles from '../styles/HotelList.module.scss';
import elementStyles from '../styles/Elements.module.scss';
import type {Hotel, RoomType} from "./HotelList";
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faCaretRight, faCaretLeft } from '@fortawesome/free-solid-svg-icons';
import {forEachComment} from "tsutils";
import SearchContext from "../context/SearchContext";

type Props = {
  hotel: Hotel;
};

const HotelItem = ({ hotel }: Props) => {
  // @ts-ignore
  const { numPeople } = useContext(SearchContext).searchParams;
  const [photoIndex, setPhotoIndex] = useState(0);

  const getStars = () => {
    let stars = [];
    for (let i = 0; i < hotel.stars; ++i) {
      stars.push(<FontAwesomeIcon icon={faStar} className={styles.star} size='lg' key={i} />);
    }
    return stars;
  };

  const getRooms = () => {
    return hotel.roomTypes.reduce((roomCombosMap: Map<string, Array<any>>, room: RoomType): any => {
      const { numRoomsAvailable, maxPeople, pricePerPerson, typeName } = room;

      if (!numRoomsAvailable || maxPeople > numPeople) return roomCombosMap;

      // check single room combination
      if (numRoomsAvailable && (numPeople % maxPeople === 0)) {
        const numRooms = numPeople / maxPeople;
        if (numRooms > numRoomsAvailable) return roomCombosMap;
        const price = numPeople * pricePerPerson;
        const description = `${numRooms} ${typeName} Room${numRooms > 1 ? 's' : ''}`;
        roomCombosMap.set(typeName, [{ description, price }]);
      } else {
        roomCombosMap.set(typeName, getRoomCombinations(room));
      }

      return roomCombosMap;
    }, new Map());
  };

  const getRoomCombinations = (room: RoomType): Array<any> => {
    const { numRoomsAvailable, maxPeople, pricePerPerson, typeName } = room;
    let initialPeopleAccommodated = 0;

    // check for accommodation capacity
    for (let i = 0; i < numRoomsAvailable; i++) {
      if ((initialPeopleAccommodated + maxPeople) < numPeople) {
        initialPeopleAccommodated += maxPeople;
        continue;
      }
      break;
    }

    const roomsTaken = initialPeopleAccommodated / maxPeople;

    return hotel.roomTypes.map((room: RoomType) => {
      let description = `${roomsTaken} ${typeName} Room${roomsTaken > 1 ? 's' : ''}`;
      let price = roomsTaken * pricePerPerson;
      let totalPeopleAccommodated = initialPeopleAccommodated;
      let roomCount = 0;
      let addRoom = false;

      for (let i = 0; i < room.numRoomsAvailable; i++) {
        if ((totalPeopleAccommodated + room.maxPeople) > numPeople
          || room.maxPeople === numPeople
        ) break;

        price += room.pricePerPerson;
        ++roomCount;
        totalPeopleAccommodated += room.maxPeople;

        if (numPeople % totalPeopleAccommodated === 0) {
          addRoom = true;
          description += ` + ${roomCount} ${room.typeName} Room${roomCount > 1 ? 's' : ''}`
          break;
        }
      }

      return addRoom ? { description, price } : null;
    }).filter((roomCombo: any) => roomCombo);
  }


  console.log('\n\n\n\n');
  console.log(hotel);
  console.log(getRooms());

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
          <div className={styles.hotel__item__rooms}>
            <span>Room description</span>
            <span>Room price</span>
          </div>
          <div className={styles.hotel__item__rooms}>
            <span>Room description</span>
            <span>Room price</span>
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
