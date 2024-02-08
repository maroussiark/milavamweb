import React, { useEffect, useState } from "react";
import SingleProduct from "../components/products/SingleProduct";
import { useWishlistContext } from "../contexts";
import emptyWish from "../assets/empty-wish.gif";
import api from "../services/api";

const Wishlist = () => {
  const { wishlist } = useWishlistContext();
  const [annonces,setAnnonces] = useState([]);
  useEffect(() => {
    const listAnnonce = async () => {
      try {
        const response = await api.get("/user/annonce/favoris");
        // console.log(response);
        setAnnonces(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    listAnnonce();
    // console.log(annonces);
  },[]);
  return (
    <div>
      {annonces.length ? (
        <>
          {" "}
          <h1 className="text-2xl py-6 font-semibold text-gray-800">
            Wishlist
          </h1>
          <main className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            {annonces.map((annonces) => (
              <SingleProduct key={annonces.id} annonce={annonces} fromWish={true} />
            ))}
          </main>
        </>
      ) : (
        <div className="h-[65vh] w-full flex flex-col items-center justify-center pt-3">
          <img
            src={emptyWish}
            alt="empty-wishlist"
            className="w-full xs:w-1/2 sm:w-1/3"
          />
          <span className="font-sans text-xl  font-bold uppercase  tracking-wide text-gray-300">
            Nothing to Show!
          </span>
          <p className="text-gray-400">
            Unlock Your Shopping Desires: Fill Your Empty Wishlist
          </p>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
