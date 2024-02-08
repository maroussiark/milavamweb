import { useEffect, useState } from "react";

import CategoryCard from "./CategoryCard";
import api from "../../services/api";
import { useAuthContext } from "../../contexts";
import api_public from "../../services/api_public";

const CategoryList = ({ catRef }) => {
  const [marque,setMarque] = useState([]);
  const { logout } = useAuthContext();
  

  useEffect(() => {
    const listMarque = async () => {
      try {
        const response = await api_public.get("/public/annonce/marque");
        // console.log(response);
        setMarque(response.data.data);
      } catch (error) {
        if(error){
          logout();
        }
        console.error(error);
      }
    };
    listMarque();
  },[logout]);
  return (
    <>
      <h1 className="text-3xl md:text-4xl  break-words text-center mt-10">
        Marque
      </h1>
      <section
        className="grid  grid-cols-1  md:grid-cols-3    gap-4  py-4 mt-1"
        ref={catRef}
      >
        {marque.map((marque) => (
          <CategoryCard key={marque.id} marque={marque} />
        ))}
      </section>
    </>
  );
};

export default CategoryList;
