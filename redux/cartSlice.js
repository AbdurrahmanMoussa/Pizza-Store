import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  products: [],
  totalPrice: 0,
  tax: 0,
  cartTotal: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const foundExistingProductIndex = state.products.findIndex(
        (product) =>
          product._id === action.payload._id &&
          parseInt(product.price) === parseInt(action.payload.price)
      );

      const currentProductExtras = action.payload.extras.map((extra) => {
        return {
          text: extra.text,
          price: extra.price,
        };
      });

      const currentProductExtraTexts = JSON.stringify(
        currentProductExtras.map((i) => i.text).sort()
      );

      const foundExistingProductWithExtra = state.products.findIndex(
        (product) =>
          foundExistingProductIndex >= 0 &&
          JSON.stringify(product.extras.map((i) => i.text).sort()) ===
            currentProductExtraTexts
      );

      if (foundExistingProductIndex >= 0 && !foundExistingProductWithExtra) {
        state.products[foundExistingProductIndex].quantity += parseInt(
          action.payload.quantity
        );

        toast.info(
          `${state.products[foundExistingProductIndex]?.title} quantity updated`,
          {
            position: "bottom-left",
          }
        );
      } else if (foundExistingProductWithExtra >= 0) {
        state.products[foundExistingProductWithExtra].quantity =
          parseInt(action.payload.quantity) +
          parseInt(state.products[foundExistingProductWithExtra].quantity);
        toast.info(
          `${state.products[foundExistingProductWithExtra]?.title} quantity updated`,
          {
            position: "bottom-left",
          }
        );
      } else {
        const currentProduct = {
          ...action.payload,
          quantity: action.payload.quantity,
        };
        state.products.push(currentProduct);
        toast.success(`${action.payload.title} added to cart!`, {
          position: "bottom-left",
        });
      }
    },
    addProductQuantity: (state, action) => {
      const currentProduct = action.payload;

      const index = state.products.findIndex(
        (product) =>
          product._id === currentProduct._id &&
          product.price === currentProduct.price
      );

      const currentProductExtras = action.payload.extras.map((extra) => {
        return {
          text: extra.text,
          price: extra.price,
        };
      });

      const currentProductExtraTexts = JSON.stringify(
        currentProductExtras.map((i) => i.text).sort()
      );

      const foundExistingProductWithExtra = state.products.findIndex(
        (product) =>
          index >= 0 &&
          JSON.stringify(product.extras.map((i) => i.text).sort()) ===
            currentProductExtraTexts
      );

      const addProductToCart = () => {
        const currentProduct = {
          ...action.payload,
          quantity: action.payload.quantity,
        };
        state.products.push(currentProduct);
        toast.success(`${action.payload.title} added to cart!`, {
          position: "bottom-left",
        });
      };

      const updatedIndexProduct = () => {
        const updatedProduct = {
          ...state.products[index],
          quantity: currentProduct.quantity + 1,
        };
        if (updatedProduct.quantity === 0) {
          state.products.splice(index, 1);
        } else if (updatedProduct.quantity > 0) {
          state.products[index].quantity += parseInt(action.payload.quantity);
          state.products[index] = updatedProduct;
        }
        toast.info(`${state.products[index]?.title} quantity updated`, {
          position: "bottom-left",
        });
      };

      const updatedExtraIndexProduct = () => {
        const updatedProduct = {
          ...state.products[foundExistingProductWithExtra],
          quantity: currentProduct.quantity + 1,
        };
        if (updatedProduct.quantity === 0) {
          state.products.splice(foundExistingProductWithExtra, 1);
        } else if (updatedProduct.quantity > 0) {
          state.products[foundExistingProductWithExtra] = updatedProduct;
        }
        toast.info(
          `${state.products[foundExistingProductWithExtra]?.title} quantity updated`,
          {
            position: "bottom-left",
          }
        );
      };

      if (index >= 0 && !foundExistingProductWithExtra) {
        updatedIndexProduct();
      } else if (foundExistingProductWithExtra >= 0) {
        updatedExtraIndexProduct();
      } else {
        addProductToCart();
      }
    },
    removeProduct: (state, action) => {
      const currentProduct = action.payload;

      const index = state.products.findIndex(
        (product) =>
          product._id === currentProduct._id &&
          product.price === currentProduct.price
      );

      const currentProductExtras = action.payload.extras.map((extra) => {
        return {
          text: extra.text,
          price: extra.price,
        };
      });

      const currentProductExtraTexts = JSON.stringify(
        currentProductExtras.map((i) => i.text).sort()
      );

      const foundExistingProductWithExtra = state.products.findIndex(
        (product) =>
          index >= 0 &&
          JSON.stringify(product.extras.map((i) => i.text).sort()) ===
            currentProductExtraTexts
      );

      const updatedIndexProduct = () => {
        const updatedProduct = {
          ...state.products[index],
          quantity: currentProduct.quantity - 1,
        };
        if (updatedProduct.quantity === 0) {
          state.products.splice(index, 1);
        } else if (updatedProduct.quantity > 0) {
          state.products[index] = updatedProduct;
        }
      };

      const updatedExtraIndexProduct = () => {
        const updatedProduct = {
          ...state.products[foundExistingProductWithExtra],
          quantity: currentProduct.quantity - 1,
        };
        if (updatedProduct.quantity === 0) {
          state.products.splice(foundExistingProductWithExtra, 1);
        } else if (updatedProduct.quantity > 0) {
          state.products[foundExistingProductWithExtra] = updatedProduct;
        }
      };

      if (index >= 0 && !foundExistingProductWithExtra) {
        updatedIndexProduct();
      } else if (foundExistingProductWithExtra >= 0) {
        updatedExtraIndexProduct();
      }
    },
    reset: () => {
      initialState;
    },
    getTotals: (state) => {
      let { price, quantity } = state.products.reduce(
        (cartQuantity, product) => {
          const { price, quantity } = product;
          const itemTotal = price * quantity;
          cartQuantity.price += itemTotal;
          cartQuantity.quantity += quantity;
          return cartQuantity;
        },
        {
          cartTotal: 0,
          price: 0,
          quantity: 0,
        }
      );
      price = parseFloat(price?.toFixed(2));
      state.cartTotal = quantity;
      state.totalPrice = price;
      state.tax = price * (0.13).toFixed(2);
    },
  },
});

export const {
  addProduct,
  addProductQuantity,
  getTotals,
  removeProduct,
  reset,
} = cartSlice.actions;

export default cartSlice.reducer;
