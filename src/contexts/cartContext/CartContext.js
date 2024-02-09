import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, cartReducer } from "../../reducers/cartReducer";
import {
  getCartItemsService,
} from "../../api/apiServices";
import { actionTypes } from "../../utils/actionTypes";
import { useAuthContext, useProductsContext } from "..";
import { notify } from "../../utils/utils";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  useProductsContext();
  const [loadingCart, setLoadingCart] = useState(false);
  const [disableCart] = useState(false);

  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (token) {
      setLoadingCart(true);
      (async () => {
        try {
          const cartRes = await getCartItemsService(token);

          if (cartRes.status === 200) {
            dispatch({
              type: actionTypes.INITIALIZE_CART,
              payload: cartRes.data.cart,
            });
          }
        } catch (err) {
          console.log(err);
          notify(
            "error",
            err?.response?.data?.errors
              ? err?.response?.data?.errors[0]
              : err?.response?.data?.message
          );
        } finally {
          setLoadingCart(false);
        }
      })();
    }
  }, [token]);

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
