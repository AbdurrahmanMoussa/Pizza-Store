import styles from "../../styles/Admin.module.css";
import Image from "next/image";
import React from "react";
import AdminAddProduct from "./AdminAddProduct";
// import AdminEditProduct from "./AdminEditProduct";

const AdminProductTable = ({
  close,
  handleDelete,
  handleEdit,
  pizzaList,
  setClose,
}) => {
  const EditButton = null;
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.content}>
          <thead>
            <tr>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          {pizzaList?.map((product) => (
            <tbody key={product._id}>
              <tr className={styles.trTitle}>
                <td>
                  <Image
                    src={product.image}
                    width={50}
                    height={50}
                    objectFit="cover"
                    alt=""
                    className={styles.image}
                  />
                </td>
                <td>{product._id.slice(0, 5)}...</td>
                <td>{product.title}</td>
                <td>${product.prices[0]}</td>
                <td>
                  <button
                    // ref={ref}
                    className={styles.button}
                    // onClick={() => {
                    //   <AdminEditProduct
                    //     handleEdit={handleEdit}
                    //     msg={"EDIT"}
                    //     id={product._id}
                    //     title={product.title}
                    //     desc={product.desc}
                    //     image={product.image}
                    //     prices={product.prices}
                    //   />;
                    //   // setClose(false);
                    // }}
                  >
                    Edit
                  </button>
                  <button
                    className={styles.button}
                    onClick={() => handleDelete(product._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          ))}
        </table>
        {!close && <AdminAddProduct close={close} setClose={setClose} />}
      </div>
    </div>
  );
};

export default AdminProductTable;
