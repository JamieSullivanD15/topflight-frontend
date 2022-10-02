import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import SearchContainer from "../components/SearchContainer";
import {useContext, useEffect, useState} from "react";
import SearchContext from "../context/SearchContext";
import HotelList from "../components/HotelList";
import Spinner from "../components/Spinner";

type Props = {
  cities: Array<string>;
  maxPriceValue: number;
  apiUrl: string;
};

const Home = ({ cities, maxPriceValue, apiUrl }: Props) => {
  // @ts-ignore
  const { searchParams } = useContext(SearchContext);
  const { numPeople, minPrice, maxPrice } = searchParams;
  const [ hotels, setHotels ] = useState([]);
  const [ loading, setLoading ] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    fetch(`${apiUrl}/hotels/dublin/${minPrice}/${maxPrice}/${numPeople}`)
      .then((res: Response) => res.json())
      .then((data) => {
        setHotels(data);
        setLoading(false);
      });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Topflight Hotels</title>
        <meta name="description" content="Topflight hotels"/>
      </Head>
      <h1 className={styles.header}>Topflight Hotels</h1>
      <SearchContainer cities={cities} maxPrice={maxPriceValue} handleSearch={handleSearch} />
      {
        loading ? <Spinner /> : <HotelList hotels={hotels} />
      }
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.API_URL;
  const citiesRes = await fetch(`${apiUrl}/hotels/cities`);
  const maxPriceRes = await fetch(`${apiUrl}/hotels/maxPrice`);
  const cities = await citiesRes.json();
  const maxPriceValue = await maxPriceRes.json();

  return {
    props: {
      cities,
      maxPriceValue,
      apiUrl,
    }
  }
};

export default Home;
