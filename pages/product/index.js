import PizzaList from "../../components/Product/PizzaList";
import { BASE_URL } from "../../util/setBaseUrl";

const Product = ({ pizzaList }) => {
  return (
    <div>
      <PizzaList pizzaList={pizzaList} />
    </div>
  );
};

export const getServerSideProps = async () => {
  const req = await fetch(`${BASE_URL}/api/products`, {
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

export default Product;
