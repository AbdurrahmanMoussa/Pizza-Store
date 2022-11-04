import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reset } from "../redux/cartSlice";

const useOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const createOrder = async (data) => {
    try {
      if (process.env.NODE_ENV === "development") {
        const res = await fetch("http://localhost:3000/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const order = await res.json();

        if (res.ok) {
          dispatch(reset());
          router.push(`/orders/${order._id}`);
        }
      } else {
        const res = await fetch(
          "https://pizza-store-seven-self.vercel.app/api/orders",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );

        const order = await res.json();

        if (res.ok) {
          dispatch(reset());
          router.push(`/orders/${order._id}`);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return { createOrder };
};

export default useOrder;
