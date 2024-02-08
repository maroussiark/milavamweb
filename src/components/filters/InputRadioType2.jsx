import React from "react";
import { useProductsContext } from "../../contexts";
const InputRadioType2 = ({ data }) => {
  const {
    applyFilters,
    filters: { marque },
  } = useProductsContext();
  return (
    <label
      className={`p-2 rounded-md  shadow-sm text-center capitalize ${
        marque === data
          ? "bg-[--primary-text-color] text-white "
          : "bg-black/[0.1] hover:bg-[--primary-text-color] hover:text-white"
      } cursor-pointer`}
    >
      {data.libelle}
      <input
        type="radio"
        name="marque"
        value={data}
        className="invisible"
        selected={marque === data}
        onChange={(e) => applyFilters(e.target.name, e.target.value)}
      />
    </label>
  );
};

export default InputRadioType2;
