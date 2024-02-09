import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, cartReducer } from "../../reducers/cartReducer";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {

  const [loadingCart, setLoadingCart] = useState(false);
  const [disableCart] = useState(false);

  const [state] = useReducer(cartReducer, initialState);

  useEffect(() => {
    setLoadingCart(false)
  }, []);

  const addProductToCart = async (_product) => {

  };

  const updateProductQtyInCart = async (_productId, _type) => {
    
  };

  const deleteProductFromCart = async (_productId) => {
    
  };
  const clearCart = () => {
  }

  const { totalPriceOfCartProducts, actualPriceOfCart } = 100;

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        disableCart,
        loadingCart,
        addProductToCart,
        updateProductQtyInCart,
        deleteProductFromCart,
        totalPriceOfCartProducts,
        actualPriceOfCart,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
