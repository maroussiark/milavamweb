import { createContext, useEffect, useReducer, useState } from "react";
import { initialState, productsReducer } from "../../reducers/productsReducer";
import {
  getAllCategoriesService,
  getAllProductsService,
} from "../../api/apiServices";
import {
  actionTypes,
  addressTypes,
  filterTypes,
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

  const getProductById = (productId) =>
    null;

  const updateInCartOrInWish = (productId, type, value) => {
    if (productId) {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) =>
          item._id === productId ? { ...item, [type]: value } : item
        ),
      });
    } else {
      dispatch({
        type: actionTypes.UPDATE_PRODUCTS,
        payload: state.allProducts.map((item) => ({
          ...item,
          inCart: false,
          qty: 0,
        })),
      });
    }
  };

  const applyFilters = (filterType, filterValue) => {
    dispatch({
      type: filterTypes.FILTERS,
      payload: { filterType, filterValue },
    });
  };
  const clearFilters = () => {
    dispatch({
      type: filterTypes.CLEAR_FILTER,
    });
  };
  const trendingProducts = null;

  const addAddress = (newAddress) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: [newAddress, ...state.addressList],
    });
  };
  const updateAddress = (addressId, updatedAddress) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: state.addressList.map((item) =>
        item.id === addressId ? updatedAddress : item
      ),
    });
    if (currentAddress.id === addressId) {
      setCurrentAddress(updatedAddress);
    }
  };
  const deleteAddress = (addressId) => {
    dispatch({
      type: addressTypes.ADD_ADDRESS,
      payload: state.addressList.filter(({ id }) => id !== addressId),
    });
    if (currentAddress.id === addressId) {
      setCurrentAddress({});
    }
  };
  const isInCart = (productId) =>
    state.allProducts.find((item) => item._id === productId && item.inCart);
  const isInWish = (productId) =>
    state.allProducts.find((item) => item._id === productId && item.inWish);

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
