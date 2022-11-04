import React from "react";
import styles from "../../styles/AddProductButton.module.css";

const AddProductButton = ({ setClose }) => {
  return (
    <div
      onClick={() => {
        setClose(false);
      }}
      className={styles.addButton}
    >
      Add Product
    </div>
  );
};

export default AddProductButton;
