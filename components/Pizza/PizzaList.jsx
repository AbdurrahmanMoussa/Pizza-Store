import styles from "../../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard";

const PizzaList = (props) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE BEST PIZZA IN OTTAWA</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facere impedit
        nisi alias id ut inventore minima a optio voluptas, est atque. Non
      </p>

      <div className={styles.wrapper}></div>
      {props.pizzaList.map((pizza) => (
        <PizzaCard pizza={pizza} key={pizza._id} />
      ))}
    </div>
  );
};

export default PizzaList;
