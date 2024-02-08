import { BiFilter } from "react-icons/bi";
import { MdKeyboardArrowUp } from "react-icons/md";

import bannerImg from "../assets/img/car3.jpg";
import loadingGif from "../assets/loading.gif";

import { Filters, SingleProduct} from "../components";

import { useProductsContext } from "../contexts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import api_public from "../services/api_public";


const ProductListing = ({initialAnnonces}) => {
  const location = useLocation();
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(false);

  const { loading } = useProductsContext();
  

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    const toggleShowArrow = () => {
      if (window.scrollY > 300) {
        setShowScrollArrow(true);
      } else {
        setShowScrollArrow(false);
      }
    };
    window.addEventListener("scroll", toggleShowArrow);

    return () => {
      window.removeEventListener("scroll", toggleShowArrow);
    };
  }, []);

  const [annonces,setAnnonces] = useState([]);
  useEffect(() => {
    if (location?.state?.from === "category") {
      setIsFilterOpen(true);
    }
    if (initialAnnonces && initialAnnonces.length > 0) {
      setAnnonces(initialAnnonces);
    } else{
      const listAnnonce = async () => {
        try {
          const response = await api_public.get("/public/annonce/accueil");
          // console.log(response);
          setAnnonces(response.data.data);
        } catch (error) {
          console.error(error);
        }
      };
      listAnnonce();
      // console.log(annonces);
    }
    
  },[initialAnnonces, location?.state?.from]);


  return (
    <>
      {loading ? (
        <div className="h-[70vh] w-full flex items-center justify-center overflow-hidden ">
          <span>
            <img width={250} src={loadingGif} alt="loading..." />
          </span>
        </div>
      ) : (
        <div>
          <header className="mb-3">
            <img
              width={2000}
              src={bannerImg}
              alt="bannerImg"
              className="rounded-md h-[40vh] object-cover"
            />
          </header>
          <section className="py-3 flex flex-col md:flex-row gap-2 justify-between">
            <h1 className="text-2xl font-bold">For You!</h1>
            <div className="flex items-center gap-2">
              <Filters
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
              />
        
              <button
                className={`flex py-1 px-2 rounded-md shadow-md items-center  gap-1 hover:bg-[--primary-text-color] hover:text-white hover:shadow-lg ${
                  isFilterOpen ? "bg-[--primary-text-color] text-white" : ""
                }`}
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <BiFilter className="text-lg" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </section>

          {annonces.length > 0 ? (
            <main className="relative grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
              {annonces.map((annonces) => (
                <SingleProduct key={annonces.id} annonce={annonces} />
              ))}
            </main>
          ) : (
            <p className="font-sans text-4xl  font-bold uppercase  tracking-wide text-gray-300 text-center w-full py-32">
              Nothing to Show!
            </p>
          )}
          <button
            className={` fixed bottom-10 bg-gray-800 right-2 p-2 rounded-full text-xl shadow-2xl transition-all delay-100 ease-in-out ${
              showScrollArrow ? "block" : "hidden"
            }`}
            onClick={scrollToTop}
          >
            <MdKeyboardArrowUp className=" text-white" />
          </button>
        </div>
      )}
    </>
  );
};

export default ProductListing;
