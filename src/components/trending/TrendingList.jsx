import { useEffect, useState } from "react";
import TrendingCard from "./TrendingCard";
import api_public from "../../services/api_public";

const TrendingList = () => {
  
  const [annonces,setAnnonces] = useState([]);

  useEffect(() => {
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
  },[]);
  return (
    <section className="grid  grid-cols-1 xs:grid-cols-2 md:grid-cols-3   lg:grid-cols-4 gap-4  py-4 mt-10">
      <h1 className="text-3xl md:text-4xl lg:text-5xl  break-words flex items-center ">
        A la une
      </h1>

      {annonces.map((annonces) => (
        <TrendingCard key={annonces.id} annonce={annonces} />
      ))}
    </section>
  );
};

export default TrendingList;
