import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, productsReducer } from "../../reducers/productsReducer";
import {
  getAllCategoriesService,
  getAllProductsService,
} from "../../api/apiServices";
import {
  actionTypes,
} from "../../utils/actionTypes";
import { useAuthContext } from "..";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [state, dispatch] = useReducer(productsReducer, initialState);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isOrderPlaced, setisOrderPlaced] = useState(false);

  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const productsRes = await getAllProductsService();
        if (productsRes.status === 200) {
          dispatch({
            type: actionTypes.INITIALIZE_PRODUCTS,
            payload: productsRes.data.products,
          });
        }

        const categoryRes = await getAllCategoriesService();

        if (categoryRes.status === 200) {
          dispatch({
            type: actionTypes.INITIALIZE_CATEGORIES,
            payload: categoryRes.data.categories,
          });
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const getProductById = (_productId) =>
    null;

  const updateInCartOrInWish = (_productId, _type, _value) => {
    null
  };

  const applyFilters = (_filterType, _filterValue) => {
    null
  };
  const trendingProducts = null;

  const addAddress = (_newAddress) => {
    null
  };
  const updateAddress = (_addressId, _updatedAddress) => {
    null
  };
  const deleteAddress = (_addressId) => {
   null
  };
  const isInCart = (_productId) =>
    null;
  const isInWish = (_productId) =>
    null;

  return (
    <ProductsContext.Provider
      value={{
        allProducts: null,
        wishlist: null,
        filters: null,
        maxRange: null,
        categoryList: null,
        addressList: null,
        isInCart,
        isInWish,
        isOrderPlaced,
        currentAddress,
        loading,
        trendingProducts,
        updateInCartOrInWish,
        getProductById,
        applyFilters,
        clearFilters,
        addAddress,
        updateAddress,
        deleteAddress,
        setCurrentAddress,
        setisOrderPlaced,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContextProvider;
