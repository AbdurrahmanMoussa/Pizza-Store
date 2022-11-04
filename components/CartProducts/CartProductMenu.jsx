import React from "react";
import styles from "../../styles/CartProductMenu.module.css";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addProductQuantity, removeProduct } from "../../redux/cartSlice";
import uuid from "react-uuid";

const CartProductMenu = ({ products, menuOpen, setMenuOpen }) => {
  const dispatch = useDispatch();

  let content = null;

  let backUpContent = () => (
    <div className={styles.backupContainer}>
      <h1>Empty Cart</h1>
      <button
        className={styles.addProductsBtn}
        onClick={() => setMenuOpen(false)}
      >
        Add some products to your cart!
      </button>
    </div>
  );

  const handleRemoveFromCart = (product) => {
    dispatch(removeProduct(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addProductQuantity(product));
  };

  const findSize = (product) => {
    let sumOfExtrasPrice = 0;
    let size = true;
    for (let i = 0; i < product.extras?.length; i++) {
      if (product.extras[i]) {
        sumOfExtrasPrice += product.extras[i].price;
      }
    }
    if (product?.extras?.length > 0) {
      switch (size) {
        case product.price - sumOfExtrasPrice === product.prices[0]:
          return "Small";
        case product.price - sumOfExtrasPrice === product.prices[1]:
          return "Medium";
        case product.price - sumOfExtrasPrice === product.prices[2]:
          return "Large";
        default:
          return "Default";
      }
    } else {
      switch (size) {
        case product.prices[0] === product.price:
          return "Small";
        case product.prices[1] === product.price:
          return "Medium";
        case product.prices[2] === product.price:
          return "Large";
        default:
          return "Default";
      }
    }
  };

  if (menuOpen) {
    content = (
      <div className={styles.container}>
        {products?.length > 0 ? <h1>Your Cart</h1> : ""}

        <ul className={styles.list}>
          {products?.length > 0 ? (
            products.map((product) => (
              <div className={styles.product} key={uuid()}>
                <Image
                  src={product.image}
                  alt=""
                  width="50"
                  height="50"
                  objectFit="contain"
                  priority
                  key={uuid()}
                />

                <li key={product._id}>
                  <div>
                    <h4 key={uuid()}>{`${findSize(product)} ${
                      product.title
                    }`}</h4>
                    <div className={styles.extras}>
                      <h5>Extras:</h5>
                      {product.extras?.map((extra) => (
                        <p key={uuid()}>{extra.text}</p>
                      ))}
                    </div>
                  </div>
                </li>

                <div className={styles.inputContainer}>
                  <button
                    className={styles.remove}
                    onClick={() => handleRemoveFromCart(product)}
                    key={uuid()}
                  >
                    -
                  </button>
                  <div className={styles.amount}>{product.quantity}</div>
                  <button
                    className={styles.remove}
                    onClick={() => handleAddToCart(product)}
                    key={uuid()}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          ) : (
            <Link href={"/product"} passHref>
              {backUpContent()}
            </Link>
          )}
          <Link href="/cart" passHref>
            {products?.length > 0 ? (
              <div className={styles.checkoutContainer}>
                <button
                  className={styles.checkout}
                  onClick={() => setMenuOpen(false)}
                >
                  Checkout
                </button>
              </div>
            ) : (
              ""
            )}
          </Link>
        </ul>
      </div>
    );
  } else {
    content = <div></div>;
  }
  return content;
};

export default CartProductMenu;
