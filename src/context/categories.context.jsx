import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export function CategoriesProvider({ children }) {
  const [categoriesMap, setCategoriesMap] = useState([]);
  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoriesyMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoriesyMap);
    };
    getCategoriesMap();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categoriesMap }}>
      {children}
    </CategoriesContext.Provider>
  );
}
