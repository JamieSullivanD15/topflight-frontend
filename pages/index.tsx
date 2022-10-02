import type { GetServerSideProps } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.scss';
import SearchContainer from "../components/SearchContainer";

type Props = {
  cities: Array<string>;
  maxPrice: number;
};

const Home = ({ cities, maxPrice }: Props) => (
  <div className={styles.container}>
    <Head>
      <title>Topflight Hotels</title>
      <meta name="description" content="Topflight hotels" />
    </Head>
    <h1 className={styles.header}>Topflight Hotels</h1>
    <SearchContainer cities={cities} maxPrice={maxPrice} />
  </div>
);

export const getServerSideProps: GetServerSideProps = async () => {
  const citiesRes = await fetch(`${process.env.API_URL}/hotels/cities`);
  const maxPriceRes = await fetch(`${process.env.API_URL}/hotels/maxPrice`);
  const cities = await citiesRes.json();
  const maxPrice = await maxPriceRes.json();

  return {
    props: {
      cities,
      maxPrice,
    }
  }
};

export default Home;
