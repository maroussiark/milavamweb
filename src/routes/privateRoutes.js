import { Cart, Wishlist, Checkout, Profile, Orders } from "../pages";
import MyAnnonce from "../pages/MyAnnonce";

const privateRoutes = [
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/wishlist",
    element: <Wishlist />,
  },
  {
    path: "/myannonce",
    element: <MyAnnonce />,
  },
  {
    path: "/checkout",
    element: <Checkout />,
  },
  {
    path: "/orders",
    element: <Orders />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
];
export { privateRoutes };
