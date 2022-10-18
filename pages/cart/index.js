import styles from "../../styles/Cart.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import OrderDetail from "../../components/Order/OrderDetail";
import useOrder from "../../hooks/use-order";
import PayPalOrder from "../../components/Order/PayPalOrder";
import OrderItem from "../../components/Order/OrderItem";
import OrderTotal from "../../components/Order/OrderTotal";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cashSelected, setCashSelected] = useState(false);
  const currency = "CAD";
  const cart = useSelector((state) => state.cart);
  const amount = (cart.totalPrice + cart.tax).toFixed(2);
  const { createOrder } = useOrder();

  <PayPalOrder />;
  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>
          <OrderItem cart={cart} />
        </div>

        <div className={styles.right}>
          <OrderTotal
            amount={amount}
            currency={currency}
            cart={cart}
            open={open}
            setCashSelected={setCashSelected}
            setOpen={setOpen}
          />
        </div>
        {cashSelected ? (
          <OrderDetail total={amount} createOrder={createOrder} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Cart;
