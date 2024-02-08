import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { BsBookmarkHeart, BsFillBookmarkHeartFill, BsChatText } from "react-icons/bs";


import {
  useAuthContext,
  useCartContext,
  useProductsContext,
  useWishlistContext,
} from "../contexts";
import { notify } from "../utils/utils";
import api_public from "../services/api_public";
import api from "../services/api";

const ProductDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { productId } = useParams();
  const [annonce, setAnnonces] = useState();
  useEffect(() => {
    const getAnnonce = async () => {

      try {
        const response = await api_public.get("/public/annonce/" + productId);
        console.log(response);
        setAnnonces(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    getAnnonce();
    // console.log(annonces);
  }, [productId]);
  const { token } = useAuthContext();
  const { getProductById } = useProductsContext();
  const { disableCart } = useCartContext();
  const { addProductToWishlist, deleteProductFromWishlist, disableWish } =
    useWishlistContext();
  
  const product = getProductById(productId);
  const [showModal, setShowModal] = useState(false);
  // console.log(annonce);
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // les mois commencent à 0
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  };
  const initialValue = {
    idReceiver : 1,
    contenu :'',
    datemessage: formatDate(new Date())
  };
  const [messagereq,setMessagereq] = useState(initialValue);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(this.state.messagereq);
    try {
      const resp = await api.post('/messageries', messagereq);
      // window.location.reload();
      console.log(resp);
      setShowModal(false);
      notify("success","Message envoyé",100);

    } catch (error) {
      console.error('errorr',error);
    }
  };


  return (
    <div className="md:min-h-[80vh] flex justify-center items-center pt-5 sm:pt-3 pb-2 relative">
      <main className="grid grid-rows-1 sm:grid-cols-2 gap-2 sm:gap-10 ">
        <section className="relative p-7 bg-black/[0.075]  flex items-center justify-center rounded-lg">
          <img
            src={annonce?.photo[0].link}
            alt=""
            className="w-full object-contain max-w-xs"
          />
        </section>

        <section className="p-7 px-10 rounded-md shadow-sm bg-white/[0.7] flex flex-col gap-3 sm:gap-5 ">
          <div className="flex flex-col gap-2">
            <h1 className=" text-2xl sm:text-4xl font-bold">{annonce?.nomVoiture}</h1>
            <p className=" text-gray-600 text-sm sm:text-base">
              {annonce?.description}
            </p>

          </div>

          <div className="flex flex-col gap-2  ">
            <h2 className="  text-lg font-semibold">A propos :</h2>
            <ul className="flex gap-5">
              <div>
                <li>
                  <span className="text-gray-500 text-sm">Type: </span>
                  {annonce?.type.libelle}
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Categorie: </span>
                  {annonce?.categorie.libelle}
                </li>
              </div>
              <div>
                <li>
                  <span className="text-gray-500 text-sm">Marque: </span>
                  {annonce?.marque.libelle}
                </li>
                <li>
                  <span className="text-gray-500 text-sm">Proprietaire: </span>
                  {annonce?.utilisateur.nom} {annonce?.utilisateur.prenom}
                </li>
              </div>
            </ul>
          </div>

          <div className="flex gap-2 items-center pb-10 sm:pb-0">
            Prix:
            <span className="ms-1 text-xl sm:text-2xl text-amber-600">
              AR {annonce?.prix.toLocaleString()}
            </span>

          </div>

          <div className={`w-full   flex gap-4 items-center   flex-wrap  `}>
            <button
              className="btn-rounded-secondary flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableCart}
              onClick={() => {
                if (!token) {
                  navigate("/login", { state: { from: location.pathname } });
                  notify("warn", "Please Login to continue");
                } else {
                  setShowModal(true);
                }
              }}
            >
              <BsChatText />{" "}
              {product?.inCart ? "Voir le message" : "Contactez"}
            </button>
            {showModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center z-50">
                <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto relative mt-20">
                  <h3 className="text-2xl font-semibold mb-4">{annonce.utilisateur.nom} {annonce.utilisateur.prenom}</h3>

                  <form className="space-y-8" method="post" onSubmit={handleSubmit}>
                    <div>
                      <label className="block text-gray-700">Message</label>
                      <input className="w-full p-2 border rounded" type="text" placeholder="Type a message here"
                        value={messagereq.contenu}
                        onChange={(e) =>
                          setMessagereq({
                            ...messagereq,
                            idReceiver : annonce.utilisateur.id,
                            contenu: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <button
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        type="submit"
                      // onClick={() => setShowModal(false)}
                      >
                        Envoyer
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Fermer
                      </button>

                    </div>
                  </form>
                </div>

              </div>
            )}
            <button
              className="btn-rounded-primary rounded-full flex items-center gap-2 text-sm disabled:cursor-not-allowed"
              disabled={disableWish}
              onClick={() => {
                if (!token) {
                  navigate("/login", { state: { from: location.pathname } });
                  notify("warn", "Please Login to continue");
                } else {
                  if (product?.inWish) {
                    deleteProductFromWishlist(product._id);
                  } else {
                    addProductToWishlist(product);
                  }
                }
              }}
            >
              {product?.inWish ? (
                <>
                  <BsFillBookmarkHeartFill />
                  <span>Remove from Wishlist</span>
                </>
              ) : (
                <>
                  {" "}
                  <BsBookmarkHeart /> <span>Wishlist Item</span>
                </>
              )}{" "}
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductDetails;
