import Image from "next/image";
import styles from "../../styles/Cart.module.css";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  addProductQuantity,
  getTotals,
  removeProduct,
} from "../../redux/cartSlice";
import uuid from "react-uuid";

const CartOrderItem = ({ cart }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart.products, dispatch]);

  const handleRemoveFromCart = (product) => {
    dispatch(removeProduct(product));
  };

  const handleAddToCart = (product) => {
    dispatch(addProductQuantity(product));
  };

  const displayExtras = (product) => {
    if (product?.extras?.length > 1) {
      return product.extras.map((extra) => (
        <div key={uuid()}>
          <br /> {extra.text}
        </div>
      ));
    } else if (product?.extras?.length === 1) {
      return product.extras.map((extra) => (
        <div key={uuid()}>{extra.text}</div>
      ));
    } else {
      return "No extras";
    }
  };

  const findSize = (product) => {
    let sumOfExtrasPrice = 0;
    let size = true;

    for (let i = 0; i < product?.extras?.length; i++) {
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

  return (
    <>
      {cart?.products?.length > 0 ? (
        <div className={styles.tableContainer}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
              </tr>

              {cart?.products.map((product) => (
                <tr className={styles.tr} key={uuid()}>
                  <td>
                    <div className={styles.imgContainer}>
                      <Image
                        src={product.image}
                        layout="fill"
                        objectFit="cover"
                        alt={product.title}
                      />
                    </div>
                  </td>
                  <td>
                    <span className={styles.name}>{product.title}</span>
                  </td>
                  <td>
                    <span className={styles.extras}>
                      {displayExtras(product)}
                    </span>
                  </td>
                  <td>
                    <span className={styles.size}>{findSize(product)}</span>
                  </td>
                  <td>
                    <span className={styles.price}>${product.price}</span>
                  </td>
                  <td className={styles.inputContainer}>
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className={styles.error}>No Items in cart</p>
      )}
    </>
  );
};

export default CartOrderItem;
