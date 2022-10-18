import styles from "../../styles/Admin.module.css";
import Image from "next/image";

const Admin = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <h1 className={styles.title}>Products</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Image</th>
              <th>ID</th>
              <th>Title</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
            <tr className={styles.trTitle}>
              <Image
                src="/img/pizza1.png"
                width="50"
                height="50"
                objectFit="cover"
                alt="admin"
              />
              <td>PizzaID</td>
              <td>PizzaTitle</td>
              <td>$50</td>
              <td>
                <button className={styles.edit}>Edit</button>
                <button className={styles.delete}>Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.item}>
        <h1 className={styles.title}>Orders</h1>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>ID</th>
              <th>Customer</th>
              <th>Total Price</th>
              <th>Payment Method</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
            <tr className={styles.trTitle}>
              <td>4332556765764</td>
              <td>John Doe</td>
              <td>$50</td>
              <td>Paid</td>
              <td>Preparing</td>
              <td>
                <button className={styles.button}>Next Stage</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
