import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, getTotals } from "../../redux/cartSlice";

const Product = ({ product }) => {
  const [size, setSize] = useState(0);
  const [price, setPrice] = useState(product.prices[0]);
  const [extras, setExtras] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    if (cart.products?.length > 0) {
      dispatch(getTotals());
    }
  }, [cart, dispatch]);

  const changePrice = (number) => {
    setPrice(price + number);
  };

  const handleSize = (index) => {
    const diff = product.prices[index] - product.prices[size];
    setSize(index);

    {
      /* add difference in price to original price */
    }
    changePrice(diff);
  };

  const handleChange = (e, option) => {
    const checked = e.target.checked;

    if (checked) {
      changePrice(option.price);
      {
        /* adding selected option to existing array */
      }
      setExtras((prev) => [...prev, option]);
    } else {
      changePrice(-option.price);
      {
        /* removing option from array that was selected*/
      }
      setExtras(extras.filter((extra) => extra._id !== option._id));
    }
  };

  const handleAddToCart = () => {
    dispatch(addProduct({ ...product, extras, quantity, price }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image
            src={product.image}
            layout="fill"
            objectFit="contain"
            alt=""
            priority
          />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${price}</span>
        <p className={styles.desc}>{product.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div
            className={styles.size}
            onClick={() => {
              handleSize(0);
            }}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.symbol}>Small</span>
          </div>
          <div
            className={styles.size}
            onClick={() => {
              handleSize(1);
            }}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.symbol}>Medium</span>
          </div>
          <div
            className={styles.size}
            onClick={() => {
              handleSize(2);
            }}
          >
            <Image src="/img/size.png" layout="fill" alt="" />
            <span className={styles.symbol}>Large</span>
          </div>
        </div>
        <h3 className={styles.choose}>Choose additional ingredients</h3>
        <div className={styles.ingredients}>
          {product.options?.map((option) => (
            <div className={styles.option} key={option._id}>
              <input
                type="checkbox"
                id={option.text}
                name={option.text}
                className={styles.checkbox}
                onChange={(e) => {
                  handleChange(e, option);
                }}
              />
              <label htmlFor="double" className={styles.double}>
                {option.text}
              </label>
            </div>
          ))}
        </div>
        <div className={styles.add}>
          <input
            onChange={(e) => {
              setQuantity(e.target.value);
            }}
            type="number"
            value={quantity}
            className={styles.quantity}
            min="1"
          />

          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const req = await fetch(`http://localhost:3000/api/products/${params.id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await req.json();

  return {
    props: { product: res },
  };
};

export default Product;
