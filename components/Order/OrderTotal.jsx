import styles from "../../styles/Cart.module.css";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PayPalOrder from "./PayPalOrder";

const OrderTotal = ({ amount, setCashSelected, cart, open, setOpen }) => {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.title}>CART TOTAL</h2>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Subtotal: </b>${cart.totalPrice}
      </div>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Tax: </b>${cart.tax.toFixed(2)}
      </div>
      <div className={styles.totalText}>
        <b className={styles.totalTextTitle}>Total: </b>${amount}
      </div>
      {open ? (
        <div className={styles.paymentMethods}>
          <button
            onClick={() => setCashSelected(true)}
            className={styles.paymentBtn}
          >
            Cash on Delivery
          </button>
          <PayPalScriptProvider
            options={{
              "client-id":
                "AXraLMDR8RdOZeIDdVDC3dLUFjwitAeVtlFxn-zj9V7IW4At7AkC4U8bKcRfDsd1lj4cbnsP6HMk2ZGu",
              components: "buttons",
              currency: "CAD",
              "disable-funding": "credit,card,p24",
            }}
          >
            <PayPalOrder
              currency={currency}
              showSpinner={false}
              createOrder={createOrder}
              amount={amount}
              cart={cart}
            />
          </PayPalScriptProvider>
        </div>
      ) : (
        <button
          disabled={cart.products.length === 0}
          onClick={() => setOpen(true)}
          className={styles.button}
        >
          Checkout
        </button>
      )}
    </div>
  );
};

export default OrderTotal;
