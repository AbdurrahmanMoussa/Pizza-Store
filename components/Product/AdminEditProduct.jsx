// import { useState, useEffect } from "react";
// import { createPortal } from "react-dom";
// import AdminEditProductForm from "./AdminEditProductForm";
// import LoadingSpinner from "../UI/LoadingSpinner";
// import Card from "../UI/Card";
// import { useRouter } from "next/router";

// const AdminEditProduct = ({
//   id,
//   title,
//   prices,
//   desc,
//   image,
//   handleEdit,
//   msg,
//   setClose,
//   close,
// }) => {
//   const [isBrowser, setIsBrowser] = useState(false);
//   const [extra, setExtra] = useState(null);
//   const [isLoading, setIsLoading] = useState(false);
//   console.log(title);
//   const [currentProduct, setCurrentProduct] = useState({
//     title: "",
//     prices: [],
//     desc: "",
//     options: [],
//   });

//   console.log(msg);
//   const router = useRouter();

//   const [file, setFile] = useState(null);

//   useEffect(() => {
//     setIsBrowser(true);
//   }, []);

//   const setTextValues = (e) => {
//     const field = e.target.name;
//     setCurrentProduct({
//       ...currentProduct,
//       [field]: e.target.value,
//     });
//   };
//   const setFileValues = (e) => {
//     setFile(e.target.files[0]);
//   };
//   const setPrices = (e, index) => {
//     const currentPrices = currentProduct.prices;
//     currentPrices[index] = e.target.value;
//     setCurrentProduct({
//       ...currentProduct,
//       prices: currentPrices,
//     });
//   };

//   const handleExtraInput = (e) => {
//     const field = e.target.name;

//     setExtra({
//       ...extra,
//       [field]: e.target.value,
//     });
//     setCurrentProduct({ ...currentProduct, extra });
//   };

//   const handleExtra = (e) => {
//     setCurrentProduct((prev) => ({
//       ...prev,
//       options: [...currentProduct.options, extra],
//     }));
//   };

//   const handleCreate = async () => {
//     setIsLoading(true);
//     const data = new FormData();

//     data.append("file", file);
//     data.append("upload_preset", "uploads");
//     try {
//       const upload = await fetch(
//         "https://api.cloudinary.com/v1_1/dydzf1y9j/image/upload",
//         { method: "POST", body: JSON.stringify(data) }
//       );
//       const res = await upload.json();

//       const { url } = res;
//       const newProduct = {
//         title: currentProduct.title,
//         desc: currentProduct.desc,
//         prices: currentProduct.prices,
//         options: currentProduct.options,
//         image: url,
//       };
//       if (process.env.NODE_ENV === "development") {
//         await fetch("http://localhost:3000/api/products", {
//           headers: { "Content-Type": "application/json" },
//           method: "POST",
//           body: JSON.stringify(newProduct),
//         });
//       } else {
//         await fetch("https://pizza-store-seven-self.vercel.app/api/products", {
//           headers: { "Content-Type": "application/json" },
//           method: "POST",
//           body: JSON.stringify(newProduct),
//         });
//       }
//       setClose(true);
//       setIsLoading(false);
//       router.push("/admin");
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   let modalContent = null;

//   if (!close && !isLoading) {
//     modalContent = (
//       <>
//         <AdminEditProductForm
//           extra={extra}
//           handleCreate={handleCreate}
//           handleExtra={handleExtra}
//           handleExtraInput={handleExtraInput}
//           product={currentProduct}
//           setClose={setClose}
//           setFileValues={setFileValues}
//           setPrices={setPrices}
//           setTextValues={setTextValues}
//           title={title}
//         />
//       </>
//     );
//   } else if (!close && isLoading) {
//     modalContent = (
//       <div>
//         <p>
//           Updating... <br />
//         </p>
//         <LoadingSpinner />
//       </div>
//     );
//   } else {
//     modalContent = (
//       <Card>
//         <h1>Success! Refresh to see new product!</h1>
//       </Card>
//     );
//   }

//   if (isBrowser) {
//     return createPortal(modalContent, document.getElementById("modal-root"));
//   } else {
//     return null;
//   }
// };

// export default AdminEditProduct;
