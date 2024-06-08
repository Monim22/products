import React, { useEffect, useState } from "react";
import dummyData from "./products.json";
import AddProductPopup from "../../pupups/AddProductPopup";
import UpdateProductPopup from "../../pupups/UpdateProductPopup";
import ProductsTable from "./ProductsTable";

function ProductsByGroup() {
  const [groupName, setGroupName] = useState("");
  const [products, setProducts] = useState([]);

  const [updateProduct, setUpdateProduct] = useState(null);
  const [addProduct, setAddProduct] = useState(false);

  const [loading, setLoading] = useState(true);
  const [updateGet, setUpdateGet] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const [page, setPage] = useState(0);

  useEffect(() => {
    setProducts(dummyData);
  }, [page, updateGet]);

  const [menuProduct, setMenuProduct] = useState(null);
  const hideProductOptions = () => {
    setMenuProduct(null);
  };

  return (
    <div className="w-full h-full p-4">
      <div onClick={hideProductOptions}>
        <div className="flex items-center h-16 px-8 pt-4 mb-5">
          <label className="px-4 py-2 m-5 text-2xl font-bold text-gray-800 bg-white rounded-lg shadow-lg w-fit dark:shadow-2x">
            {groupName}
          </label>
          <div className="flex items-center justify-end w-full">
            <button
              className="h-12 px-4 py-2 mr-10 font-bold text-white rounded-lg bg-supplair-primary w-72 hover:bg-blue-600"
              onClick={() => {
                setAddProduct(true);
              }}
            >
              Add Product
            </button>
          </div>
        </div>
        <div>
          <ProductsTable
            products={products}
            menuProduct={menuProduct}
            setMenuProduct={setMenuProduct}
            setUpdateProduct={setUpdateProduct}
          />
          <div className="h-16"></div>
          <div className="fixed bg-white bottom-5 right-10"></div>
          {addProduct && <AddProductPopup close={setAddProduct} />}
          {updateProduct && (
            <UpdateProductPopup
              product={updateProduct}
              close={setUpdateProduct}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsByGroup;
