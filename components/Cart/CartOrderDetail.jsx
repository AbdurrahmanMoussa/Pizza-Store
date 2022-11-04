import styles from "../../styles/OrderDetail.module.css";
import { useState } from "react";

const CartOrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  const [error, setError] = useState(true);

  let errorText = "Can't be empty";

  const handleCustomer = (e) => {
    if (e.target.value.length > 2) {
      setCustomer(e.target.value);
      setError(false);
    } else {
      return <p>{errorText}</p>;
    }
  };

  const handleAddress = (e) => {
    setAddress(e.target.value);
  };

  // const handlePhone = (e) => {
  //   setPhone(e.target.value);
  // };

  const handleOrder = () => {
    createOrder({ customer, address, phoneNumber, total, method: 0 });
  };

  const handleOrderError = () => {
    if (customer === "" || address === "") {
      setError(true);
    } else {
      setError(false);
      handleOrder();
    }
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
          {error ? <p>{errorText}</p> : null}
        </div>
        {/* <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            placeholder="+1-(613)-444-4444"
            type="text"
            x
            className={styles.input}
            onChange={handlePhone}
          />
        </div> */}

        <div className={styles.item}>
          <label className={styles.label}>Address</label>
          <input
            placeholder="123 Main St"
            type="text"
            className={styles.input}
            onChange={handleAddress}
          />
        </div>
        <button
          className={styles.orderButton}
          onClick={handleOrderError}
          disabled={error}
        >
          Order
        </button>
      </div>
    </div>
  );
};

export default CartOrderDetail;
