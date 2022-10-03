import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import SearchContainer from "../components/SearchContainer";
import {useContext, useEffect, useState} from "react";
import SearchContext from "../context/SearchContext";
import HotelList from "../components/HotelList";
import Spinner from "../components/Spinner";
import Paginator from "../components/Paginator";

type Props = {
  cities: Array<string>;
  maxPriceValue: number;
};

const Home = ({ cities, maxPriceValue }: Props) => {
  // @ts-ignore
  const { handleSearch, hotels, loading, showError, totalResults } = useContext(SearchContext);

  return (
    <div className={styles.container}>
      <Head>
        <title>Topflight Hotels</title>
        <meta name="description" content="Topflight hotels"/>
      </Head>
      <h1 className={styles.header}>Topflight Hotels</h1>
      <SearchContainer
        cities={cities}
        maxPrice={maxPriceValue}
        handleSearch={handleSearch}
        showError={showError}
      />
      {
        loading ? <Spinner /> : <HotelList hotels={hotels} totalResults={totalResults} />
      }
      <Paginator />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const citiesRes = await fetch(`${apiUrl}/hotels/cities`);
  const maxPriceRes = await fetch(`${apiUrl}/hotels/maxPrice`);
  const cities = await citiesRes.json();
  const maxPriceValue = await maxPriceRes.json();

  return {
    props: {
      cities,
      maxPriceValue,
    }
  }
};

export default Home;
