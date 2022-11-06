import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AdminAddProductForm from "./AdminAddProductForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import { useRouter } from "next/router";

const AdminAddProduct = ({ setClose, close }) => {
  const [isBrowser, setIsBrowser] = useState(false);
  const [extra, setExtra] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    prices: [],
    desc: "",
    options: [],
  });

  const router = useRouter();

  const [file, setFile] = useState(null);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const setTextValues = (e) => {
    const field = e.target.name;
    setProduct({
      ...product,
      [field]: e.target.value,
    });
  };
  const setFileValues = (e) => {
    setFile(e.target.files[0]);
  };
  const setPrices = (e, index) => {
    const currentPrices = product.prices;
    currentPrices[index] = e.target.value;
    setProduct({
      ...product,
      prices: currentPrices,
    });
  };

  const handleExtraInput = (e) => {
    const field = e.target.name;

    setExtra({
      ...extra,
      [field]: e.target.value,
    });
    setProduct({ ...product, extra });
  };

  const handleExtra = (e) => {
    setProduct((prev) => ({
      ...prev,
      options: [...product.options, extra],
    }));
  };

  const handleCreate = async () => {
    setIsLoading(true);
    const data = new FormData();

    data.append("file", file);
    data.append("upload_preset", "uploads");

    const config = {
      method: "POST",
      body: data,
    };

    let imgUrl = "https://api.cloudinary.com/v1_1/dydzf1y9j/image/upload";

    try {
      const upload = await fetch(imgUrl, config);
      const res = await upload.json();

      const { url } = res;
      console.log(url);
      console.log(res);

      const newProduct = {
        title: product.title,
        desc: product.desc,
        prices: product.prices,
        options: product.options,
        image: url,
      };

      console.log(newProduct);

      if (process.env.NODE_ENV === "development") {
        await fetch("http://localhost:3000/api/products", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(newProduct),
        });
      } else {
        await fetch("https://pizza-store-seven-self.vercel.app/api/products", {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify(newProduct),
        });
      }
      router.push("/admin");
      setClose(true);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  let modalContent = null;

  if (!close && !isLoading) {
    modalContent = (
      <>
        <AdminAddProductForm
          extra={extra}
          handleCreate={handleCreate}
          handleExtra={handleExtra}
          handleExtraInput={handleExtraInput}
          product={product}
          setClose={setClose}
          setFileValues={setFileValues}
          setPrices={setPrices}
          setTextValues={setTextValues}
        />
      </>
    );
  } else if (!close && isLoading) {
    modalContent = (
      <div>
        <p>
          Updating... <br />
        </p>
        <LoadingSpinner />
      </div>
    );
  }

  if (isBrowser) {
    return createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
};
export default AdminAddProduct;
