import styles from "../../styles/Admin.module.css";
import { useState } from "react";
import Link from "next/link";
import AdminAddProductButton from "../../components/Product/AdminAddProductButton";
import AdminProductTable from "../../components/Product/AdminProductTable";
import { useRouter } from "next/router";
import { BASE_URL } from "../../util/setBaseUrl";

const Admin = ({ products }) => {
  const [pizzaList, setPizzaList] = useState(products);

  const [close, setClose] = useState(true);

  const router = useRouter();
  const handleDelete = async (id) => {
    try {
      const res = await fetch(`${BASE_URL}/api/products/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      return router.reload();
    } catch (err) {
      console.log(err);
    }
  };

  // const handleEdit = async (id) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/products/${id}`, {
  //       method: "PUT",
  //       headers: { "Content-Type": "application/json" },
  //     });

  //     const data = await res.json();

  //     setPizzaList(
  //       JSON.stringify(
  //         pizzaList.map((pizza) => (pizza._id === id ? data : pizza))
  //       )
  //     );
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <>
      <div className={styles.redirectBtns}>
        {<AdminAddProductButton setClose={setClose} />}
        <Link href="/admin/order-list">
          <a className={styles.orderList}>Order List Page</a>
        </Link>
      </div>
      <AdminProductTable
        close={close}
        handleDelete={handleDelete}
        // handleEdit={handleEdit}
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

  const productRes = await fetch(`${BASE_URL}/api/products`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  const productData = await productRes.json();

  return {
    props: {
      products: productData,
    },
  };
};

export default Admin;
