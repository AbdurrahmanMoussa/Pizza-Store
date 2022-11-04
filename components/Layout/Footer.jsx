import Image from "next/image";
import styles from "../../styles/Footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" layout="fill" objectFit="cover" priority />
      </div>

      <div className={styles.card}>
        <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
        <p className={styles.text}>
          1903 S. Main Street, Suite #100.
          <br /> Ottawa, ON K1G 349
          <br /> (613)-600-7403
        </p>
        <p className={styles.text}>
          1903 S. Main Street, Suite #100.
          <br /> Ottawa, ON K1G 349
          <br /> (613)-600-7403
        </p>
        <p className={styles.text}>
          1903 S. Main Street, Suite #100.
          <br /> Ottawa, ON K1G 349
          <br /> (613)-600-7403
        </p>
      </div>
      <div className={styles.card}>
        <h1 className={styles.title}>WORKING HOURS</h1>
        <p className={styles.text}>
          MONDAY - FRIDAY <br /> 7:00 - 22:00
        </p>
        <p className={styles.text}>
          SATURDAY - SUNDAY <br /> 9:00 - 18:00
        </p>
      </div>
    </div>
  );
};
export default Footer;
