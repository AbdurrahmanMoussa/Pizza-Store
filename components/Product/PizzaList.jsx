import styles from "../../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";
import { setBackgroundColors } from "../../util/setBackgroundColors";

const PizzaList = ({ pizzaList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN OTTAWA</h1>
      <p className={styles.desc}>
        Check Out Our Delicious Pizzas. We Have A Variety Of Flavours To Choose.
      </p>

      <div className={styles.wrapper}>
        {pizzaList?.map((pizza, index) => (
          <PizzaCard
            pizza={pizza}
            key={pizza._id}
            backgroundColor={
              setBackgroundColors[index % setBackgroundColors.length]
            }
          />
        ))}
      </div>
    </div>
  );
};

export default PizzaList;
