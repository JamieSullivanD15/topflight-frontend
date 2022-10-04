import {ReactNode, createContext, useState, useEffect, useRef, ChangeEvent, ChangeEventHandler} from "react";

type Props = {
  children?: ReactNode;
}

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
      .then((data) => {
        // @ts-ignore
        setHotels(data.hotels);
        setTotalResults(data.totalResults);
        setLoading(false);
      });
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
