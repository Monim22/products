import React, { useEffect, useState } from "react";
import PopUp1 from "./Prompt1";
import { toast } from "react-toastify";
import { FaDownload } from "react-icons/fa6";
import { useUserContext } from "../../pages/UserContext";

function UpdateProductPopup({ close, product }) {
  const [formData, setFormData] = useState({
    name: "",
    group: "",
    image: "",
    price: "",
    quantity: "",
    description: "",
  });
  const [imagePaths, setImagePaths] = useState([]);

  useEffect(() => {
    if (product && product.imagePaths) {
      setFormData(product);
      setImagePaths(product.imagePaths);
    }
  }, [product]);

  const closePopup = () => {
    close(null);
  };

  const handleUpdateProduct = (e) => {
    e.preventDefault();

    // Validation logic
    if (formData.name.trim().length < 3) {
      toast.error("Invalid Product Name");
    } else {
      const updatedFormData = { ...formData, imagePaths };
      close(updatedFormData);
      toast.success("Product updated");
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageDelete = (index) => {
    const updatedImagePaths = [...imagePaths];
    updatedImagePaths.splice(index, 1);
    setImagePaths(updatedImagePaths);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (imagePaths.length < 8) {
          setImagePaths((prevPaths) => [...prevPaths, reader.result]);
        } else {
          toast.error("Maximum 8 images allowed");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const { userData } = useUserContext() || { userData: null };

  return (
    <PopUp1 closeMe={closePopup} title="Update Product">
      <div className="p-4">
        <form onSubmit={handleUpdateProduct}>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Product Name :</span>
            <input
              type="text"
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Price :</span>
            <input
              type="number"
              required
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
              min="0"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Quantity :</span>
            <input
              type="number"
              required
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
              min="0"
            />
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Group :</span>
            <select
              name="group"
              value={formData.group}
              onChange={handleChange}
              className="w-full h-10 px-6 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            >
              <option value="">Select Group</option>
              {userData?.categories.map((product) => (
                <option key={product.group} value={product.group}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Image :</span>
            <div className="flex flex-col items-start">
              <label htmlFor="image" className="flex items-center gap-2 mb-2">
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <span className="flex items-center justify-center h-10 px-6 bg-white border-2 border-gray-400 rounded-lg cursor-pointer w-fit hover:bg-gray-100">
                  <FaDownload style={{ fontSize: "1rem" }} className="w-24 " />
                </span>
              </label>
              <div className="flex flex-row overflow-x-auto">
                {imagePaths.map((imagePath, index) => (
                  <div key={index} className="relative mr-2">
                    <img
                      src={imagePath}
                      alt={`Image ${index}`}
                      className="object-cover w-16 h-16 rounded-xl"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                      onClick={() => handleImageDelete(index)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-1 mb-6 text-sm font-semibold">
            <span>Description :</span>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full h-24 px-6 py-3 border-2 border-gray-400 rounded-lg focus:outline-supplair-primary"
            />
          </div>
          <div className="flex justify-end gap-5">
            <button type="button" onClick={closePopup} className="cancelBtn">
              Cancel
            </button>
            <button type="submit" className="approveBtn">
              Save
            </button>
          </div>
        </form>
      </div>
    </PopUp1>
  );
}

export default UpdateProductPopup;
