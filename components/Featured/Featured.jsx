import styles from "../../styles/Featured.module.css";
import Image from "next/image";
import { useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);

  const handleArrow = (direction) => {
    if (direction === "left") {
      setIndex(index > 0 ? index - 1 : 2);
    } else {
      setIndex(index < 2 ? index + 1 : 0);
    }
  };
  return (
    <div className={styles.container}>
      <div
        className={styles.arrowContainer}
        style={{ left: 0 }}
        onClick={() => handleArrow("l")}
      >
        <Image
          className={styles.left}
          src="/img/arrowleft.png"
          alt="Featured"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <div className={styles.wrapper}>
        <h1 className={styles.header}>HOT & SPICY PIZZA</h1>
        <ul className={styles.list}>
          <li>50% OFF</li>
          <li className={styles.orderNow}>ORDER NOW</li>
          <li className={styles.name}>Abdurrahman Moussa</li>
        </ul>

        <div className={styles.pizza}>
          <Image
            className={styles.pizzas}
            src={"/img/pizza.jpg"}
            alt=""
            layout="fill"
            priority
          />
        </div>
      </div>

      <div
        className={styles.arrowContainer}
        style={{ right: 0 }}
        onClick={() => handleArrow("r")}
      >
        <Image src="/img/arrowright.png" alt="Featured" layout="fill" />
      </div>
    </div>
  );
};

export default Featured;
