import Head from "next/head";
import Featured from "../components/Featured/Featured";
import styles from "../styles/Home.module.css";
import PizzaList from "../components/Product/PizzaList";
export default function Home({ pizzaList }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Ottawa Pizza Restaurant</title>
        <meta name="description" content="Best Pizza in Ottawa" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured pizzaList={pizzaList} />

      <PizzaList pizzaList={pizzaList} />
    </div>
  );
}

export const getServerSideProps = async () => {
  const req = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();

  return {
    props: { pizzaList: res },
  };
};
