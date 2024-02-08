import React from "react";
import { useProductsContext } from "../../contexts";

const InputRange = () => {
  const {
    maxRange,
    applyFilters,
    filters: { priceRange },
  } = useProductsContext();
  const max = 1000000000;
  return (
    
    <div>

      <input className="border rounded-md p-1.5 shadow-sm mb-2" type="number" placeholder="min"></input>
      <input className="border rounded-md p-1.5 shadow-sm mb-2" type="number" placeholder="max"></input>
    </div>  
  );
};

export default InputRange;
