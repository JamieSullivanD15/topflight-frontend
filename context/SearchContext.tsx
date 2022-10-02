import {ReactNode, createContext, useState, ChangeEvent, ChangeEventHandler} from "react";

type Props = {
  children?: ReactNode;
}

const SearchContext = createContext({});

export const SearchProvider = ({ children }: Props) => {
  const [searchParams, setSearchParams] = useState(
    {
      numPeople: 0,
      minPrice: 0,
      maxPrice: 0,
      city: '',
    }
  );

  const handleChange = (e: any): void => {
    const { name } = e.target;
    let { value } = e.target;
    if (!isNaN(value)) {
      value = parseInt(value);
    }
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <SearchContext.Provider value={{ searchParams, handleChange }}>
      { children }
    </SearchContext.Provider>
  );
};

export default SearchContext;
