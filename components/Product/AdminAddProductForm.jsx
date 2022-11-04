import styles from "../../styles/AddProduct.module.css";
import uuid from "react-uuid";

const AdminAddProductForm = ({
  extra,
  handleCreate,
  handleExtra,
  handleExtraInput,
  product,
  setClose,
  setFileValues,
  setPrices,
  setTextValues,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span
          onClick={() => {
            setClose(true);
          }}
          className={styles.close}
        >
          X
        </span>
        <h1>Add Product</h1>
        <div className={styles.item}>
          <label className={styles.label}>Choose an image</label>
          <input
            className={styles.input}
            type="file"
            onChange={setFileValues}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Title</label>
          <input
            className={styles.input}
            type="text"
            name="title"
            value={product.title}
            onChange={setTextValues}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Description</label>
          <input
            className={styles.input}
            type="text"
            name="desc"
            value={product.desc}
            onChange={setTextValues}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.smallInput}`}
              type="number"
              placeholder="Small"
              onChange={(e) => setPrices(e, 0)}
            />
            <input
              className={`${styles.input} ${styles.smallInput}`}
              type="number"
              placeholder="Medium"
              onChange={(e) => setPrices(e, 1)}
            />
            <input
              className={`${styles.input} ${styles.smallInput}`}
              type="number"
              placeholder="Large"
              onChange={(e) => setPrices(e, 2)}
            />
          </div>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.smallInput}`}
              type="text"
              name="text"
              placeholder="Item"
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.smallInput}`}
              type="number"
              name="price"
              placeholder="Price"
              onChange={handleExtraInput}
            />
            <button
              disabled={!extra?.text || !extra?.price}
              className={styles.extraButton}
              onClick={handleExtra}
            >
              Add
            </button>
          </div>
          <div className={styles.extraItems}>
            {product.options.map((option) => (
              <span key={uuid()} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button onClick={handleCreate} className={styles.addButton}>
          Create
        </button>
      </div>
    </div>
  );
};

export default AdminAddProductForm;
