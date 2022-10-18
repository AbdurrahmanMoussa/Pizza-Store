import Image from "next/image";
import styles from "../../styles/Cart.module.css";

const OrderItem = ({ cart }) => {
  return (
    <>
      <table className={styles.table}>
        <tbody>
          <tr className={styles.trTitle}>
            <th>Product</th>
            <th>Name</th>
            <th>Extras</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>

          {cart.products.map((product) => (
            <tr className={styles.tr} key={product._id}>
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
                  {product.extras.map((extra) => (
                    <span key={extra._id}>
                      {extra.text ? extra.text : "none"},
                    </span>
                  ))}
                </span>
              </td>
              <td>
                <span className={styles.price}>${product.price}</span>
              </td>
              <td>
                <span className={styles.quantity}>{product.quantity}</span>
              </td>
              <td>
                <span className={styles.total}>
                  ${product.price * product.quantity}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderItem;
