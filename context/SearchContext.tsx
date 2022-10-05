import {ReactNode, createContext, useState, useEffect, useRef, ChangeEvent, ChangeEventHandler} from "react";

type Props = {
  children?: ReactNode;
}

export type Hotel = {
  id: number;
  name: string;
  stars: number;
  city: string;
  address: string;
  photos: Array<string>;
  roomTypes: Array<any>;
};

export type RoomType = {
  typeName: string;
  pricePerPerson: number;
  maxPeople: number;
  numRoomsAvailable: number;
};

const SearchContext = createContext({});

export const SearchProvider = ({ children }: Props) => {
  const didMountRef = useRef(false);
  const [ hotels, setHotels ] = useState([]);
  const [ loading, setLoading ] = useState(false);
  const [ showError, setShowError ] = useState(false);
  const [ hasSearched, setHasSearched ] = useState(false);
  const [ totalResults, setTotalResults ] = useState(0);
  const [searchParams, setSearchParams] = useState(
    {
      numPeople: 0,
      minPrice: 0,
      maxPrice: 0,
      city: '',
    }
  );
  const [paginationParams, setPaginationParams] = useState(
    {
      pageSize: 3,
      page: 1,
    }
  );

  const handleChange = (e: any): void => {
    const { name } = e.target;
    let { value } = e.target;
    if (!isNaN(value)) {
      value = parseInt(value);
    }
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePriceChange = (minPrice: number, maxPrice: number): void => {
    setSearchParams((prevState) => ({
      ...prevState,
      minPrice,
      maxPrice,
    }));
  };

  const handlePageChange = (page: number): void => {
    setPaginationParams((prevState) => ({
      ...prevState,
      page,
    }));
  };

  const handlePageSizeChange = (pageSize: string): void => {
    setPaginationParams((prevState) => ({
      ...prevState,
      pageSize: parseInt(pageSize),
      page: 1,
    }));
  };

  const handleSearch = () => {
    const { city, minPrice, maxPrice, numPeople } = searchParams;
    const { page, pageSize } = paginationParams;
    const url = `${process.env.NEXT_PUBLIC_API_URL}/hotels`;
    const query = `?city=${city}&minPrice=${minPrice}&maxPrice=${maxPrice}&numPeople=${numPeople}&page=${page}&pageSize=${pageSize}`

    if (numPeople === 0 || city === '') {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    if (!hasSearched) setHasSearched(true);

    setLoading(true);

    fetch(`${url}${query}`)
      .then((res: Response) => res.json())
      .then((data: any) => {
        const hotels = data.hotels.map((hotel: Hotel) => {
          hotel.roomTypes = getRooms(hotel);
          return hotel;
        });
        setHotels(hotels);
        setTotalResults(data.totalResults);
        setLoading(false);
      });
  }

  const getRooms = (hotel: Hotel) => {
    return hotel.roomTypes.reduce((roomList: Array<any>, room: RoomType): any => {
      const { numRoomsAvailable, maxPeople, pricePerPerson, typeName } = room;
      const { numPeople } = searchParams;

      if (!numRoomsAvailable || maxPeople > numPeople) return roomList;

      // check single room combination
      if (numRoomsAvailable && (numPeople % maxPeople === 0)) {
        const numRooms = numPeople / maxPeople;
        if (numRooms > numRoomsAvailable) return roomList;
        const price = numPeople * pricePerPerson;
        const description = `${numRooms} ${typeName} Room${numRooms > 1 ? 's' : ''}`;
        roomList.push([{ description, price }]);
      } else {
        roomList.push(getRoomCombinations(hotel, room));
      }

      return roomList;
    }, [])
      .filter((roomCombos: any) => roomCombos.length > 0)
      .sort((a: any, b: any) => b[0].price - a[0].price);
  };

  const getRoomCombinations = (hotel: Hotel, room: RoomType): Array<any> => {
    const { numRoomsAvailable, maxPeople, pricePerPerson, typeName } = room;
    const { numPeople } = searchParams;
    let initialPeopleAccommodated = 0;

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
        ) {
          break;
        }

        price += room.pricePerPerson;
        ++roomCount;
        totalPeopleAccommodated += room.maxPeople;

        if (totalPeopleAccommodated === numPeople) {
          addRoom = true;
          description += ` + ${roomCount} ${room.typeName} Room${roomCount > 1 ? 's' : ''}`
          break;
        }
      }

      return addRoom ? { description, price } : null;
    }).filter((roomCombo: any) => roomCombo);
  }

  useEffect(() => {
    if (didMountRef.current) {
      return handleSearch();
    }
    didMountRef.current = true;
  }, [paginationParams]);

  return (
    <SearchContext.Provider
      value={{
        hotels,
        loading,
        showError,
        hasSearched,
        totalResults,
        searchParams,
        paginationParams,
        handleChange,
        handlePriceChange,
        handlePageChange,
        handlePageSizeChange,
        handleSearch,
    }}
    >
      { children }
    </SearchContext.Provider>
  );
};

export default SearchContext;
