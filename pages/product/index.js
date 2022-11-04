import PizzaList from "../../components/Product/PizzaList";

const Product = ({ pizzaList }) => {
  return (
    <div>
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  if (process.env.NODE_ENV === "development") {
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
  } else {
    const req = await fetch(
      "https://pizza-store-seven-self.vercel.app/api/products",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const res = await req.json();

    return {
      props: { pizzaList: res },
    };
  }
};

export default Product;
