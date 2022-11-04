import { useState } from "react";
import styles from "../../../styles/OrderList.module.css";
import Link from "next/link";

const OrderList = ({ orders }) => {
  const [orderList, setOrderList] = useState(orders);
  const status = ["Preparing", "On The Way", "Delivered"];

  const handleStatus = async (id) => {
    const item = orderList.filter((order) => order._id === id)[0];
    const currentStatus = item.status;

    try {
      if (process.env.NODE_ENV === "development") {
        const res = await fetch(`http://localhost:3000/api/orders/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: currentStatus + 1 }),
        });

        const data = await res.json();

        setOrderList([data, ...orderList.filter((order) => order._id !== id)]);
        if (currentStatus >= 2) {
          setOrderList(orderList.filter((order) => order._id !== id));
        }
      } else {
        const res = await fetch(
          `https://pizza-store-seven-self.vercel.app/api/orders/${id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: currentStatus + 1 }),
          }
        );

        const data = await res.json();

        setOrderList([data, ...orderList.filter((order) => order._id !== id)]);
        if (currentStatus >= 2) {
          setOrderList(orderList.filter((order) => order._id !== id));
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    try {
      if (process.env.NODE_ENV === "development") {
        await fetch(`http://localhost:3000/api/orders/${id}`, {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        });
        setOrderList(orderList.filter((order) => order._id !== id));
      } else {
        await fetch(
          `https://pizza-store-seven-self.vercel.app/api/orders/${id}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          }
        );
        setOrderList(orderList.filter((order) => order._id !== id));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.item}>
      <Link href="/admin">
        <a className={styles.orderList}>Back To Product List Page</a>
      </Link>
      <h1 className={styles.title}>Orders</h1>
      <table className={styles.content}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        {orderList.map((order) => (
          <tbody key={order._id}>
            <tr>
              <td>{order._id.slice(0, 5)}...</td>
              <td>{order.customer}</td>
              <td>${order.total}</td>
              <td>
                {order.method === 0 ? <span>Cash</span> : <span>Paid</span>}
              </td>
              <td>{status[order.status]}</td>
              <td>
                {order.status < 2 && (
                  <button
                    disabled={order.status >= 2}
                    onClick={() => handleStatus(order._id)}
                    className={styles.stageBtn}
                  >
                    Next Stage
                  </button>
                )}

                {order.status >= 2 && (
                  <button
                    onClick={() => {
                      handleDelete(order._id);
                    }}
                    className={styles.removeBtn}
                  >
                    Remove
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        ))}
      </table>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const orderRes = await fetch("http://localhost:3000/api/orders", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const orderData = await orderRes.json();

  return {
    props: {
      orders: orderData,
    },
  };
};

export default OrderList;
