import { AiOutlineClose } from "react-icons/ai";
import { useProductsContext } from "../../contexts";

import { useEffect, useState } from "react";
import api from "../../services/api";
import ProductListing from "../../pages/ProductListing";
import api_public from "../../services/api_public";

const FilterHeading = ({ text }) => <h2 className="text-xl mb-4">{text}</h2>;
const Filters = ({ isFilterOpen, setIsFilterOpen }) => {
  const { clearFilters } = useProductsContext();
  const [marque, setMarque] = useState([]);
  const [categorie, setCategorie] = useState([]);
  const [carburant, setCarburant] = useState([]);
  const [FiltreAnnonceReq, setFiltreAnnonceReq] = useState({
    motcle:null,
    categorie: null,
    marque: null,
    carburant: null,
    prixFiltre: {},
    dateFiltre:{
      dateMin:'2023-01-02',
      dateMax:'2024-12-12'
    },
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFiltreAnnonceReq(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    const listMarque = async () => {
      try {
        const response = await api.get("/marque");
        console.log(response);
        setMarque(response.data.data);
      } catch (error) {

        console.error(error);
      }
    };
    listMarque();
  }, []);
  useEffect(() => {
    const listCategorie = async () => {
      try {
        const response = await api.get("/categorie");
        console.log(response);
        setCategorie(response.data.data);
      } catch (error) {

        console.error(error);
      }
    };
    listCategorie();
  }, []);
  useEffect(() => {
    const listCarburant = async () => {
      try {
        const response = await api.get("/carburant");
        console.log(response);
        setCarburant(response.data.data);
      } catch (error) {

        console.error(error);
      }
    };
    listCarburant();
  }, []);
  const handleSubmit = async event => {
    event.preventDefault();
    const filtreAnnonceReq = JSON.stringify( {
      ...FiltreAnnonceReq,
      prixFiltre: {
        prixMin: parseFloat(event.target.prixMin.value),
        prixMax: parseFloat(event.target.prixMax.value)
      }
    });
    
    try {
      console.log(filtreAnnonceReq);
      const annonce = await api_public.post("/public/annonce/filtre", filtreAnnonceReq);
      setIsFilterOpen(false);
      return <ProductListing initialAnnonces={annonce} ></ProductListing>
    } catch (error) { 
      console.error('error',error);
    }

  };
  return (
    <aside
      className={`filtersContainer fixed  top-0 h-screen z-10 flex flex-col p-3 gap-3 overflow-auto
    transition-all ease-in-out duration-300  ${isFilterOpen ? "left-0 " : "-left-96"
        }
    `}
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Filter Car</h1>
          <AiOutlineClose
            className="text-xl cursor-pointer"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
          />
        </div>
        <button
          className="py-0.5 px-2 w-16 text-center bg-black/[0.2]  text-sm font-semibold shadow-sm rounded-md hover:bg-gray-800 hover:text-white transition-colors "
          onClick={clearFilters}
        >
          Clear
        </button>
        <section className="py-3">
          <FilterHeading text="Categorie" />
          <div className="grid grid-rows-2 grid-cols-2 gap-2">
            {marque.map((data, index) => (
              <label
                className={`p-2 rounded-md  shadow-sm text-center capitalize ${marque === data
                  ? "bg-[--primary-text-color] text-white "
                  : "bg-black/[0.1] hover:bg-[--primary-text-color] hover:text-white"
                  } cursor-pointer`}
              >
                {data.libelle}
                <input
                  type="radio"
                  name="marque"
                  value={data.id}
                  className="invisible"
                  // selected={marque === data}
                  onChange={handleInputChange}
                />
              </label>
            ))}
          </div>
        </section>
        <section className="py-3">
          <FilterHeading text="Price Range" />

          <div>

            <input className="border rounded-md p-1.5 shadow-sm mb-2" type="number" placeholder="prixMin" name="prixMin" value={FiltreAnnonceReq.prixFiltre.prixMin} onChange={handleInputChange}></input>
            <input className="border rounded-md p-1.5 shadow-sm mb-2" type="number" placeholder="prixMax" name="prixMax" value={FiltreAnnonceReq.prixFiltre.prixMax} onChange={handleInputChange}></input>
          </div>

        </section>
        <section className="py-3">
          <FilterHeading text="Categories" />
          <div className="flex flex-col gap-2">
            {categorie.map((data, index) => (
              <label className="capitalize cursor-pointer">
                <input
                  className="accent-[--primary-text-color] me-2 cursor-pointer"
                  type="checkbox"
                  name="categorie"
                  // checked={categories.includes(data)}
                  value={data.id}
                  // onChange={checkboxHandler}
                  onChange={handleInputChange}
                />
                {data.libelle}
              </label>
            ))}
          </div>
        </section>

        <section className="py-3 flex flex-col gap-2">
          <FilterHeading text="Carburant" />
          {carburant.map((data, index) => (
            <label className="cursor-pointer">
              <input
                type="radio"
                className="accent-current cursor-pointer"
                value={data.id}
                key={index}
                name="carburant"
                onChange={handleInputChange}
              />{" "}
              {data.libelle}
            </label>
          ))}
        </section>
        <button className="btn-primary w-2/3 text-lg text-center "> SEARCH </button>
      </form>
    </aside>
  );
};

export default Filters;
