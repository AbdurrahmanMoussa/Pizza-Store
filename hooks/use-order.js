import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { reset } from "../redux/cartSlice";
import { BASE_URL } from "../util/setBaseUrl";

const useOrder = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const createOrder = async (data) => {
    try {
      const res = await fetch(`${BASE_URL}/api/orders`, {
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
    } catch (err) {
      console.log(err);
    }
  };
  return { createOrder };
};

export default useOrder;
