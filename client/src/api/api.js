import axios from "axios";

const PRODUCTS = "https://dummyjson.com/products?limit=10&select=title,price";

export const fetchProducts = async (callbackFunction) => {
  let response;
  try {
    response = await axios.get(PRODUCTS);
    if (response.status === 200) {
      callbackFunction(true, response.data);
    } else {
      callbackFunction(false, response.data);
    }
  } catch (err) {
    callbackFunction(false, err.response);
  }
};
