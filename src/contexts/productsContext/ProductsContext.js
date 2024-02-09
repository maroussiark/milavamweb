import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, productsReducer } from "../../reducers/productsReducer";
import { useAuthContext } from "..";

export const ProductsContext = createContext();

const ProductsContextProvider = ({ children }) => {
  const { token } = useAuthContext();
  const [loading, setLoading] = useState(false);

  const [dispatch] = useReducer(productsReducer, initialState);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [isOrderPlaced, setisOrderPlaced] = useState(false);

  useEffect(() => {
    setLoading(false);
      
  }, [dispatch, token]);

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
