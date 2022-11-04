import styles from "../../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN OTTAWA</h1>
      <p className={styles.desc}>
        Check Out Our Delicious Pizzas. We Have A Variety Of Flavours To Choose.
      </p>

      <div className={styles.wrapper}>
        {props.pizzaList?.map((pizza) => (
          <PizzaCard pizza={pizza} key={pizza._id} />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
