import styles from "../../styles/Admin.module.css";
import { useState } from "react";
import Link from "next/link";
import AdminAddProductButton from "../../components/Product/AdminAddProductButton";
import AdminProductTable from "../../components/Product/AdminProductTable";

const Admin = ({ products, admin }) => {
  const [pizzaList, setPizzaList] = useState(products);

  const [close, setClose] = useState(true);

  const handleDelete = async (id) => {
    console.log(id);
    try {
      const res = await fetch(`http://localhost:3000/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      setPizzaList(
        JSON.stringify(pizzaList.filter((pizza) => pizza._id !== id))
      );
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className={styles.redirectBtns}>
        {admin && <AdminAddProductButton setClose={setClose} />}
        <Link href="/admin/order-list">
          <a className={styles.orderList}>Order List Page</a>
        </Link>
      </div>
      <AdminProductTable
        close={close}
        handleDelete={handleDelete}
        pizzaList={pizzaList}
        setClose={setClose}
      />
    </>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";

  let admin = false;

  if (myCookie.token === process.env.TOKEN) {
    admin = true;
  } else {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }
  const productRes = await fetch("http://localhost:3000/api/products", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const productData = await productRes.json();

  return {
    props: {
      products: productData,
      admin,
    },
  };
};

export default Admin;
