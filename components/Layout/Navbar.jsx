import styles from "../../styles/Navbar.module.css";
import Image from "next/image";
import PhoneInTalkIcon from "@material-ui/icons/PhoneInTalk";
import ShoppingCart from "@material-ui/icons/ShoppingCart";
import { useSelector } from "react-redux";
import Link from "next/link";
import CartProductMenu from "../CartProducts/CartProductMenu";
import { useState } from "react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const quantity = useSelector((state) => state.cart.cartTotal);
  const products = useSelector((state) => state.cart.products);

  const showCounter = () => {
    if (quantity > 0) {
      return <div className={styles.counter}>{quantity}</div>;
    } else {
      return "";
    }
  };
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
          <Link href={"/product"}>
            <li className={styles.listItem}>Products</li>
          </Link>
          <Link href="/menu">
            <li className={styles.listItem}>Menu</li>
          </Link>
          <Image src="/img/logo.png" width="150px" height="60px" alt="" />
          <Link href="/about-us">
            <li className={styles.listItem}>About Us</li>
          </Link>
          <Link href="/contact">
            <li className={styles.listItem}>Contact</li>
          </Link>
          <Link href="/admin">
            <li className={styles.listItem}>Admin</li>
          </Link>
        </ul>
      </div>

      <div className={styles.item}>
        <div className={styles.cart}>
          <ShoppingCart
            fontSize="large"
            className={styles.cartIcon}
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {showCounter()}
          <CartProductMenu
            products={products}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
