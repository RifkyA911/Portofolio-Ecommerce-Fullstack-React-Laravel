import axios from "axios";
import { getAccessToken, getUser, refreshAccessToken } from "./Session";

const superAuthorizationPassword = import.meta.env
  .VITE_SUPER_AUTHORIZATION_PASSWORD;
const loginEmail = import.meta.env.VITE_SUPER_ADMIN_EMAIL;
const loginPassword = import.meta.env.VITE_SUPER_ADMIN_PASSWORD;

export const getApiUrl = (endpointType, params, data, formType) => {
  // console.log("data", data);
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

  // if (baseUrls.hasOwnProperty(endpointType)) {
  //   return baseUrls[endpointType];
  // } else if (apiEndpoints.id.hasOwnProperty(endpointType)) {
  //   return `${apiEndpoints.id[endpointType]}/${data.id ? data.id : ""}`;
  // } else if (apiEndpoints.all.hasOwnProperty(endpointType)) {
  //   return apiEndpoints.all[endpointType];
  // }

  const URL_Segments = endpointType.split("/");
  console.log(URL_Segments);
  if (baseUrls.hasOwnProperty(endpointType)) {
    return baseUrls[endpointType];
  } else if (apiEndpoints.id.hasOwnProperty(URL_Segments[0])) {
    if (URL_Segments[1] == "refresh") {
      return `${apiEndpoints.id[URL_Segments[0]]}/refresh`;
    } else {
      return `${apiEndpoints.id[URL_Segments[0]]}/${data.id ? data.id : ""}`;
    }
  } else if (apiEndpoints.all.hasOwnProperty(URL_Segments[0])) {
    if (URL_Segments[1] == "paginate") {
      return `${apiEndpoints.all[URL_Segments[0]]}/${URL_Segments[1]}/${
        URL_Segments[2]
      }/${URL_Segments[3]}`;
    } else {
      return apiEndpoints.all[URL_Segments[0]];
    }
  }

  return null;
};

const RequestAPI = async (
  endpoint,
  method = "GET",
  data = null,
  headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAccessToken()}`,
  }
) => {
  let access_token = getAccessToken();
  console.log(endpoint, data);
  try {
    const url = `${getApiUrl(endpoint, null, data)}`;
    const axiosConfig = {
      method: method,
      url: url,
      data: {
        ...data,
        superAuthorizationPassword: superAuthorizationPassword,
        token: access_token,
      },
      headers: headers,
    };

    const response = await axios(axiosConfig);
    // if (!data.getRefreshAccessToken) {
    //   refreshAccessToken();
    // }
    return response;
  } catch (error) {
    // Handle errors (e.g., network issues, API errors)
    console.error("API request failed:", error);
    throw error;
  }
};

export default RequestAPI;
