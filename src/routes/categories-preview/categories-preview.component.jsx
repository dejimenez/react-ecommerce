import { useContext } from "react";
import { Outlet } from "react-router-dom";
import CategoryPreview from "../../components/category-preview/category-preview.component";

import { CategoriesContext } from "../../context/categories.context";

export default function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="shop-container">
      <Outlet />
      {Object.keys(categoriesMap).map((title) => (
        <CategoryPreview
          key={title}
          title={title}
          products={categoriesMap[title]}
        />
      ))}
    </div>
  );
}
