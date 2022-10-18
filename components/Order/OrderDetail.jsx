import styles from "../../styles/OrderDetail.module.css";
import { useState } from "react";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");

  const handleCustomer = (e) => {
    setCustomer(e.target.value);
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  const handleOrder = () => {
    createOrder({ customer, address, total, method: 0 });
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>You will pay ${total} after delivery</h1>
        <div className={styles.item}>
          <label className={styles.label}>Name</label>
          <input
            placeholder="John Doe"
            type="text"
            className={styles.input}
            onChange={handleCustomer}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            placeholder="+1-(613)-444-4444"
            type="text"
            className={styles.input}
            // onChange={handlePhone}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            placeholder="123 Main St"
            type="text"
            className={styles.input}
            onChange={handleAddress}
          />
        </div>
        <button className={styles.orderButton} onClick={handleOrder}>
          Order
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
