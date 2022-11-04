import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import AdminAddProductForm from "./AdminAddProductForm";
import LoadingSpinner from "../UI/LoadingSpinner";
import Card from "../UI/Card";
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
    try {
      const upload = await fetch(
        "https://api.cloudinary.com/v1_1/dydzf1y9j/image/upload",
        { method: "POST", body: JSON.stringify(data) }
      );
      const res = await upload.json();

      const { url } = res;
      const newProduct = {
        title: product.title,
        desc: product.desc,
        prices: product.prices,
        options: product.options,
        image: url,
      };

      await fetch("http://localhost:3000/api/products", {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(newProduct),
      });

      setClose(true);
      setIsLoading(false);
      router.push("/admin");
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
  } else {
    modalContent = (
      <Card>
        <h1>Success! Refresh to see new product!</h1>
      </Card>
    );
  }

  if (isBrowser) {
    return createPortal(modalContent, document.getElementById("modal-root"));
  } else {
    return null;
  }
};
export default AdminAddProduct;
