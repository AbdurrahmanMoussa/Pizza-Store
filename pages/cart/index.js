import styles from "../../styles/Cart.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import CartOrderDetail from "../../components/Cart/CartOrderDetail";
import useOrder from "../../hooks/use-order";
import CartPayPalOrder from "../../components/Cart/CartPayPalOrder";
import CartOrderItem from "../../components/Cart/CartItem";
import CartOrderTotal from "../../components/Cart/CartOrderTotal";

const Cart = () => {
  const [open, setOpen] = useState(false);
  const [cashSelected, setCashSelected] = useState(false);
  const currency = "CAD";
  const cart = useSelector((state) => state.cart);
  const amount = (cart.totalPrice + cart.tax).toFixed(2);
  const { createOrder } = useOrder();

  <CartPayPalOrder />;

  return (
    <>
      <div className={styles.container}>
        <div className={styles.left}>{<CartOrderItem cart={cart} />}</div>

        <div className={styles.right}>
          <CartOrderTotal
            amount={amount}
            currency={currency}
            cart={cart}
            createOrder={createOrder}
            open={open}
            setCashSelected={setCashSelected}
            setOpen={setOpen}
          />
        </div>
        {cashSelected ? (
          <CartOrderDetail total={amount} createOrder={createOrder} />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Cart;
