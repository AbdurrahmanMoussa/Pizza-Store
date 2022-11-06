import Image from "next/image";
import styles from "../../styles/PizzaCard.module.css";
import Link from "next/link";

function PizzaCard({ pizza, backgroundColor }) {
  return (
    <div
      className={styles.container}
      style={{
        background: backgroundColor.background,
        filter: backgroundColor.filter,
      }}
    >
      <h1 className={styles.title}>{pizza.title}</h1>
      <Link href={`/product/${pizza._id}`} passHref>
        <a>
          <Image
            className={styles.image}
            src={pizza.image}
            alt=""
            width="600"
            height="800"
          />
        </a>
      </Link>
    </div>
  );
}

export default PizzaCard;
