import styles from "../../styles/Navbar.module.css";
import Image from "next/image";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import Link from "next/link";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.cartTotal);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <PhoneInTalkIcon />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>+1 613-600-7403</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem}>Homepage</li>
          </Link>
          <li className={styles.listItem}>Products</li>
          <li className={styles.listItem}>Menu</li>
          <Image src="/img/logo.png" width="150px" height="60px" />
          <li className={styles.listItem}>Events</li>
          <li className={styles.listItem}>About Us</li>
          <li className={styles.listItem}>Contact</li>
        </ul>
      </div>
      <Link href="/cart">
        <div className={styles.item}>
          <div className={styles.cart}>
            <ShoppingCart fontSize="large" className={styles.cartIcon} />
            <div className={styles.counter}>{quantity}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Navbar;
