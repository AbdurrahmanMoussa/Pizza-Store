import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";

// Custom component to wrap the PayPalButtons and handle currency changes
const CartPayPalOrder = ({
  currency,
  showSpinner,
  cart,
  amount,
  createOrder,
}) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
  const style = { layout: "vertical" };

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={style}
        disabled={false}
        forceReRender={[amount, currency, style]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          const orderId = await actions.order.create({
            purchase_units: [
              {
                amount: {
                  currency_code: currency,
                  value: amount,
                },
              },
            ],
          });
          return orderId;
        }}
        onApprove={async function (data, actions) {
          return actions.order.capture().then(function (details) {
            const shipping = details.purchase_units[0].shipping;

            createOrder({
              customer: shipping.name.full_name,
              address: shipping.address.address_line_1,
              tax: cart.tax,
              total: amount,
              method: 1,
            });
          });
        }}
      />
    </>
  );
};

export default CartPayPalOrder;
