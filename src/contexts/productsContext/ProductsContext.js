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

  const [dispatch] = useReducer(productsReducer, initialState);
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
  }, [dispatch,token]);

  const clearFilters = () => {

  };

  const getProductById = (_productId) => {
  }

  const updateInCartOrInWish = (_productId, _type, _value) => {
    
  };

  const applyFilters = (_filterType, _filterValue) => {
    
  };
  const trendingProducts = null;

  const addAddress = (_newAddress) => {
    
  };
  const updateAddress = (_addressId, _updatedAddress) => {
    
  };
  const deleteAddress = (_addressId) => {
    
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
