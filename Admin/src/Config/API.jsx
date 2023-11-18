import axios from "axios";
import { getAccessToken } from "./Session";

const superAuthorizationPassword = import.meta.env
  .VITE_SUPER_AUTHORIZATION_PASSWORD;
const loginEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL;
const loginPassword = import.meta.env.VITE_SUPER_ADMIN_PASSWORD;

export const getApiUrl = (endpointType, data, formType) => {
  console.log("data", data);
  const baseUrls = {
    publicImg: import.meta.env.VITE_SERVER_PUBLIC_IMG,
    publicAdmin: import.meta.env.VITE_SERVER_PUBLIC_ADMIN,
    publicUser: import.meta.env.VITE_SERVER_PUBLIC_USER,
    publicProduct: import.meta.env.VITE_SERVER_PUBLIC_PRODUCT,
  };

  const apiEndpoints = {
    id: {
      product: import.meta.env.VITE_API_ID_PRODUCT,
      category: import.meta.env.VITE_API_ID_CATEGORY,
      admin: import.meta.env.VITE_API_ID_ADMIN,
      customer: import.meta.env.VITE_API_ID_CUSTOMER,
      cart: import.meta.env.VITE_API_ID_CART,
      wishlist: import.meta.env.VITE_API_ID_WHISLIS,
      transaction: import.meta.env.VITE_API_ID_TRANSACTION,
      review: import.meta.env.VITE_API_ID_REVIEW,
      message: import.meta.env.VITE_API_ID_MESSAGE,
    },
    all: {
      products: import.meta.env.VITE_API_ALL_PRODUCTS,
      categories: import.meta.env.VITE_API_ALL_CATEGORIES,
      admins: import.meta.env.VITE_API_ALL_ADMINS,
      customers: import.meta.env.VITE_API_ALL_CUSTOMERS,
      carts: import.meta.env.VITE_API_ALL_CARTS,
      wishlists: import.meta.env.VITE_API_ALL_WHISLIS,
      transactions: import.meta.env.VITE_API_ALL_TRANSACTIONS,
      reviews: import.meta.env.VITE_API_ALL_REVIEWS,
      messages: import.meta.env.VITE_API_ALL_MESSAGES,
    },
  };

  if (baseUrls.hasOwnProperty(endpointType)) {
    return baseUrls[endpointType];
  } else if (apiEndpoints.id.hasOwnProperty(endpointType)) {
    return data.id ? `${apiEndpoints.id[endpointType]}/${data.id}` : 0;
  } else if (apiEndpoints.all.hasOwnProperty(endpointType)) {
    return apiEndpoints.all[endpointType];
  }

  return null;
};

const RequestAPI = async (
  endpoint,
  method = "GET",
  data = null,
  formType,
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  }
) => {
  if (data) {
    try {
      const url = `${getApiUrl(endpoint, data, formType)}`;
      const axiosConfig = {
        method,
        url,
        data,
        headers: headers,
      };

      const response = await axios(axiosConfig);
      return response;
    } catch (error) {
      // Handle errors (e.g., network issues, API errors)
      console.error("API request failed:", error);
      throw error;
    }
  }
};

export default RequestAPI;
